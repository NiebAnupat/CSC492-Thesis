namespace server.Configurations {
    public class OAuthSetting {
        public bool EnableOAuth { get; set; }
        public string Authority { get; set; }
        public string Audience { get; set; }
        public Dictionary<string, string> Scopes { get; set; }
    }
}