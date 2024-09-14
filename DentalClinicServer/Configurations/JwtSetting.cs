namespace DentalClinicServer.Configurations;

public class JwtSetting {
    public string Secret { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public string TokenName { get; set; }
    public int ExpireMinutes { get; set; }
}
