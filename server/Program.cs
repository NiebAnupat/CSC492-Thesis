using Serilog;
using server;

try {
    var builder = WebApplication.CreateBuilder(args);
    var configuration = builder.Configuration;

    Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();
    Log.Information("Starting web host");

    builder.Host.UseSerilog();

    var startup = new Startup(builder.Configuration);
    startup.ConfigureServices(builder.Services);

    var app = builder.Build();
    startup.Configure(app, app.Environment);

    app.Run();
} catch (Exception ex) {
    Log.Fatal(ex, "Host terminated unexpectedly");
} finally {
    Log.CloseAndFlush();
}