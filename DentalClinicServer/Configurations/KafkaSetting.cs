using Confluent.Kafka;

namespace DentalClinicServer.Configurations {
    public class KafkaSetting {
        public string Host { get; set; }
        public int Port { get; set; } = 9092;
        public SecurityProtocol? Protocol { get; set; } = null;
        public string Username { get; set; }
        public string Password { get; set; }
        public SaslMechanism? Mechanism { get; set; } = null;
    }
}