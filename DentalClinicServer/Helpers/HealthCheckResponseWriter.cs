using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Text;
using System.Text.Json;

namespace DentalClinicServer.Helpers {
    public static class HealthCheckResponseWriter {
        public static Task WriteResponseReadiness(HttpContext httpContext, HealthReport result) {
            httpContext.Response.ContentType = "application/json; charset=utf-8";

            var options = new JsonWriterOptions {
                Indented = true
            };

            using (var stream = new MemoryStream()) {
                using (var writer = new Utf8JsonWriter(stream, options)) {
                    writer.WriteStartObject();
                    writer.WriteString("status", result.Status.ToString());
                    writer.WriteStartObject("result");
                    foreach (var entry in result.Entries) {
                        writer.WriteStartObject(entry.Key);
                        writer.WriteString("status", entry.Value.Status.ToString());
                        writer.WriteString("description", entry.Value.Description);
                        writer.WriteStartObject("data");
                        foreach (var item in entry.Value.Data) {
                            writer.WritePropertyName(item.Key);
                            JsonSerializer.Serialize(
                                writer, item.Value, item.Value?.GetType() ??
                                typeof(object));
                        }
                        writer.WriteEndObject();
                        writer.WriteEndObject();
                    }
                    writer.WriteEndObject();
                    writer.WriteEndObject();
                }
                var json = Encoding.UTF8.GetString(stream.ToArray());

                return httpContext.Response.WriteAsync(json);
            }
        }

        public static Task WriteResponseLiveness(HttpContext httpContext, HealthReport result) {
            httpContext.Response.ContentType = "application/json; charset=utf-8";

            var options = new JsonWriterOptions {
                Indented = true
            };

            using (var stream = new MemoryStream()) {
                using (var writer = new Utf8JsonWriter(stream, options)) {
                    writer.WriteStartObject();
                    writer.WriteString("status", result.Status.ToString());
                    writer.WriteEndObject();
                }
                var json = Encoding.UTF8.GetString(stream.ToArray());

                return httpContext.Response.WriteAsync(json);
            }
        }
    }
}