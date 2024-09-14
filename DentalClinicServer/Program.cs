using DentalClinicServer;
using DentalClinicServer.Configurations;
using Serilog;

try {
    var builder = WebApplication.CreateBuilder(args);
    var configuration = builder.Configuration;
    ProjectSetting projectSetting = configuration.GetSection(ConfigKey.Project)?.Get<ProjectSetting>();

    Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configuration).Enrich.WithProperty("Application", projectSetting.Title).CreateLogger();
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
