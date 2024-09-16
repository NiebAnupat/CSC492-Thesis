namespace DentalClinicServer.Middlewares;

public class JwtCookieMiddleware {
    private readonly RequestDelegate _next;
    private readonly Serilog.ILogger Log = Serilog.Log.ForContext<JwtCookieMiddleware>();
    public JwtCookieMiddleware(RequestDelegate next) {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context) {
        Log.Information("JwtCookieMiddleware invoked");
        if (context.Request.Cookies.TryGetValue("access_token", out var access_token)) {
            Log.Information("JwtCookieMiddleware: Found access_token cookie");
            context.Request.Headers.Append("Authorization", $"Bearer {access_token}");
            Log.Information("JwtCookieMiddleware: Added Authorization header with token");
        } else {
            Log.Information("JwtCookieMiddleware: No access_token cookie found");
        }

        await _next(context);
    }
}
