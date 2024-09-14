using DentalClinicServer.Configurations;
using DentalClinicServer.Data;
using DentalClinicServer.Helpers;
using DentalClinicServer.Middlewares;
using DentalClinicServer.Startups;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Prometheus;

namespace DentalClinicServer {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;

            if (configuration.GetSection(ConfigKey.Project) is null)
                throw new ArgumentNullException("Project is not setted in appsetting.json");

            ProjectConfiguration = configuration.GetSection(ConfigKey.Project)?.Get<ProjectSetting>();
            // OAuthConfiguration = configuration.GetSection("OAuth")?.Get<OAuthSetting>();
            // MasstransitConfiguration = configuration.GetSection("Masstransit")?.Get<MasstransitSetting>();
            // QuartzConfiguration = configuration.GetSection("Quartz")?.Get<QuartzSetting>();
        }

        private IConfiguration Configuration { get; }

        private ProjectSetting ProjectConfiguration { get; }
        // private OAuthSetting OAuthConfiguration { get; }
        // private MasstransitSetting MasstransitConfiguration { get; }
        // private QuartzSetting QuartzConfiguration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddControllers(options => {
                    options.Filters.Add(typeof(ErrorFilter));
                    options.Filters.Add(new ValidateModelFilter());
                    options.Conventions.Add(new GlobalRoutePrefixConvention($"api/{ProjectConfiguration.Version}"));
                })
                .AddNewtonsoftJson(options => {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                });

            services.AddHttpContextAccessor();

            services.AddResponseCaching();

            // CORS *
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

            // HealthChecks
            services.AddHealthChecks()
                .AddDbContextCheck<AppDBContext>(tags: new[] { "ready" })
                .ForwardToPrometheus();

            // AutoMapper *
            services.AddAutoMapper(typeof(Startup));

            // DBContext *
            services.AddDbContext<AppDBContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            // Masstransit (RabbitMQ & Kafka)
            // services.AddMassTransit(ProjectConfiguration, MasstransitConfiguration);

            // Dependency Injection *
            services.ConfigDependency(Configuration);

            // Quart (Cron Job) *
            // services.AddQuart(QuartzConfiguration);

            // Swagger (API Document) *
            services.AddSwagger(ProjectConfiguration);
            // services.AddSwaggerWithOAuth(ProjectConfiguration, OAuthConfiguration);

            // Authenication *
            // services.AddAuthorizationWithOAuth(OAuthConfiguration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }


            app.UseMiddleware<RequestLoggingMiddleware>();

            // Swagger
            app.UseSwagger(ProjectConfiguration);

            // app.UseSwaggerWithOAuth(ProjectConfiguration);

            //app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseHttpMetrics();

            app.UseResponseCaching();

            app.UseAuthentication();

            app.UseAuthorization();

            // CORS
            app.UseCors("MyPolicy");

            // HealthChecks
            app.UseEndpoints(endpoints => {
                endpoints.MapHealthChecks("/health/ready", new HealthCheckOptions {
                    ResponseWriter = HealthCheckResponseWriter.WriteResponseReadiness,
                    Predicate = (check) => check.Tags.Contains("ready")
                });

                endpoints.MapHealthChecks("/health/live", new HealthCheckOptions {
                    ResponseWriter = HealthCheckResponseWriter.WriteResponseLiveness,
                    Predicate = (check) => !check.Tags.Contains("ready")
                });

                endpoints.MapMetrics();
            });

            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
