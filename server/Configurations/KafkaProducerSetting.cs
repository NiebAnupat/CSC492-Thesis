using MassTransit.KafkaIntegration;
using MassTransit.Registration;

namespace server.Configurations {
    public abstract class KafkaProducerSetting {
        public Type Contract { get; set; }

        public string TopicName { get; set; }

        public abstract void GetProducerConfig(ref IRiderRegistrationConfigurator rider);
    }

    public class KafkaProducerSetting<TContract> : KafkaProducerSetting where TContract : class {
        public KafkaProducerSetting(string topicName) {
            Contract = typeof(TContract);
            TopicName = topicName;
        }

        public override void GetProducerConfig(ref IRiderRegistrationConfigurator rider) {
            rider.AddProducer<TContract>(TopicName);
        }
    }
}