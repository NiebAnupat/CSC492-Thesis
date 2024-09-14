namespace DentalClinicServer.Configurations {
    public class RabbitMQSetting {
        public string Host { get; set; }
        public ushort Port { get; set; } = 5672;
        public string Vhost { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int TLS { get; set; } = 0;
    }
}