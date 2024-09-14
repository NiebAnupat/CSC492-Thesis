// using DentalClinicServer.Configurations;
// using GreenPipes;
// using MassTransit;
// using MassTransit.Definition;
// using MassTransit.ExtensionsDependencyInjectionIntegration;
// using System.Security.Authentication;
//
// namespace DentalClinicServer.Startups {
//     public static class MasstransitServices {
//         public static IServiceCollection AddMassTransit(
//             this IServiceCollection services,
//             ProjectSetting projectSetting,
//             MasstransitSetting masstransitSetting
//         ) {
//             if (!masstransitSetting.EnableRabbitMQ) return services;
//
//             // เพิ่ม MassTransit ใน Service Pipeline
//             services.AddMassTransit(configure => {
//                 configure.ConfigRabbitMQ();
//                 configure.SetupRabbitMq(masstransitSetting.RabbitMQSetting, projectSetting.CleanTitle);
//
//                 if (masstransitSetting.EnableKafka) {
//                     configure.SetupKafka(masstransitSetting.KafkaSetting, projectSetting.CleanTitle);
//                 }
//             });
//
//             // เพิ่ม Hosted Service ของ MassTransit เพื่อคุยกับ RabbitMQ
//             services.AddMassTransitHostedService();
//
//             return services;
//         }
//
//         private static IServiceCollectionBusConfigurator SetupRabbitMq(
//             this IServiceCollectionBusConfigurator configure,
//             RabbitMQSetting rabbitMQSetting,
//             string serviceName
//         ) {
//             // เพิ่ม Config ของ RabbitMQ
//             configure.UsingRabbitMq((context, configurator) => {
//                 if (string.IsNullOrEmpty(rabbitMQSetting.Host))
//                     throw new ArgumentNullException("RabbitMQ Host is not setted");
//
//                 // ตั้งค่า Host บนเครื่องเดียวกัน ปกติเป็น localhost
//                 if (!string.IsNullOrWhiteSpace(rabbitMQSetting.Vhost)) {
//                     configurator.Host(rabbitMQSetting.Host, rabbitMQSetting.Port, rabbitMQSetting.Vhost, h => {
//                         if (!string.IsNullOrWhiteSpace(rabbitMQSetting.Username)
//                             && !string.IsNullOrWhiteSpace(rabbitMQSetting.Password)) {
//                             h.Username(rabbitMQSetting.Username);
//                             h.Password(rabbitMQSetting.Password);
//                         }
//
//                         if (rabbitMQSetting.TLS != 0) {
//                             h.UseSsl(s => {
//                                 s.Protocol = (SslProtocols) rabbitMQSetting.TLS;
//                             });
//                         }
//                     });
//                 } else {
//                     configurator.Host(rabbitMQSetting.Host, h => {
//                         if (!string.IsNullOrWhiteSpace(rabbitMQSetting.Username)
//                             && !string.IsNullOrWhiteSpace(rabbitMQSetting.Password)) {
//                             h.Username(rabbitMQSetting.Username);
//                             h.Password(rabbitMQSetting.Password);
//                         }
//
//                         if (rabbitMQSetting.TLS != 0) {
//                             h.UseSsl(s => {
//                                 s.Protocol = (SslProtocols) rabbitMQSetting.TLS;
//                             });
//                         }
//                     });
//                 }
//
//                 // ตั้ง Endpoint ของ RabbitMQ
//                 configurator.ConfigureEndpoints(context, new KebabCaseEndpointNameFormatter(serviceName, false));
//
//                 // หากไม่สามารถรับค่าจาก RabbitMQ ได้จะทำการทำซ้ำ
//                 configurator.UseMessageRetry(retryConfigurator => {
//                     // ทำครั้ง 3 ครั้ง ทุก 5 วินาที ก่อนเลิกทำ
//                     retryConfigurator.Interval(3, TimeSpan.FromSeconds(5));
//                 });
//             });
//
//             return configure;
//         }
//
//         private static IServiceCollectionBusConfigurator SetupKafka(
//             this IServiceCollectionBusConfigurator configure,
//             KafkaSetting kafkaSetting,
//             string serviceName
//         ) {
//             var producers = ProjectSetup.ConfigKafkaProducer();
//             var consumers = ProjectSetup.ConfigKafkaConsumer(serviceName);
//
//             configure.AddRider(rider => {
//                 foreach (var producer in producers) {
//                     producer.GetProducerConfig(ref rider);
//                 }
//
//                 foreach (var consumer in consumers) {
//                     rider.AddConsumer(consumer.TargetConsumer);
//                 }
//
//                 rider.UsingKafka((context, k) => {
//                     k.Host($"{kafkaSetting.Host}:{kafkaSetting.Port}", configurator => {
//                         if (kafkaSetting.Protocol != null) k.SecurityProtocol = kafkaSetting.Protocol;
//
//                         if (!string.IsNullOrWhiteSpace(kafkaSetting.Username)
//                         && !string.IsNullOrWhiteSpace(kafkaSetting.Password)
//                         && kafkaSetting.Mechanism != null) {
//                             configurator.UseSasl(saslConfigurator => {
//                                 saslConfigurator.Username = kafkaSetting.Username;
//                                 saslConfigurator.Password = kafkaSetting.Password;
//                                 saslConfigurator.Mechanism = kafkaSetting.Mechanism;
//                             });
//                         }
//                     });
//
//                     foreach (var consumer in consumers) {
//                         consumer.GetConsumerConfig(ref k, context);
//                     }
//                 });
//             });
//
//             return configure;
//         }
//     }
// }
