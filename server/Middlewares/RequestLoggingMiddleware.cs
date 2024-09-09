using Microsoft.IO;
using Serilog;

namespace server.Middlewares {
    public class RequestLoggingMiddleware {
        private readonly RequestDelegate _next;
        private readonly RecyclableMemoryStreamManager _recyclableMemoryStreamManager;

        public RequestLoggingMiddleware(RequestDelegate next) {
            _next = next;
            _recyclableMemoryStreamManager = new RecyclableMemoryStreamManager();
        }

        public async Task Invoke(HttpContext context) {
            var path = context.Request.Path;

            if (path.StartsWithSegments("/api")) {
                var requestTime = DateTime.Now;
                await LogRequest(context);
                await LogResponse(context, requestTime);
            } else {
                await _next(context);
            }
        }

        private static string ReadStreamInChunks(Stream stream) {
            const int readChunkBufferLength = 4096;
            stream.Seek(0, SeekOrigin.Begin);

            using var textWriter = new StringWriter();
            using var reader = new StreamReader(stream);

            var readChunk = new char[readChunkBufferLength];
            int readChunkLength;

            do {
                readChunkLength = reader.ReadBlock(readChunk,
                                                   0,
                                                   readChunkBufferLength);
                textWriter.Write(readChunk, 0, readChunkLength);
            } while (readChunkLength > 0);

            return textWriter.ToString();
        }

        private async Task LogRequest(HttpContext context) {
            context.Request.EnableBuffering();
            await using var requestStream = _recyclableMemoryStreamManager.GetStream();
            await context.Request.Body.CopyToAsync(requestStream);

            var path = context.Request.Path;

            if (context.Request.QueryString.HasValue) path += context.Request.QueryString;

            var header = '[' + String.Join(",", context.Request.Headers.Select(_ => _.Key + ' ' + _.Value).ToArray()) + "]";

            var body = ReadStreamInChunks(requestStream);

            body = body.Replace(Environment.NewLine, "");

            Log.Debug("{Scheme} {Method} {Path} request {Header} {Body}", context.Request.Scheme, context.Request.Method, path, header, body);
            context.Request.Body.Position = 0;
        }

        private async Task LogResponse(HttpContext context, DateTime requestTime) {
            var originalBodyStream = context.Response.Body;

            await using var responseBody = _recyclableMemoryStreamManager.GetStream();
            context.Response.Body = responseBody;

            await _next(context);
            context.Response.Body.Seek(0, SeekOrigin.Begin);

            var text = await new StreamReader(context.Response.Body).ReadToEndAsync();
            context.Response.Body.Seek(0, SeekOrigin.Begin);

            var path = context.Request.Path;
            if (context.Request.QueryString.HasValue) path += context.Request.QueryString;

            var time = DateTime.Now - requestTime;

            Log.Debug(
                "{Scheme} {Method} {Path} responsed {Code} in {Time} ms {Body}",
                context.Request.Scheme,
                context.Request.Method,
                path,
                context.Response.StatusCode,
                requestTime.Millisecond,
                text
            );

            await responseBody.CopyToAsync(originalBodyStream);
        }
    }
}