using server.DTOs.Auth;

namespace server.Services.Auth {
    public interface ILoginDetailServices {
        string Token { get; }

        string[] Roles { get; }

        string[] Permissions { get; }

        LoginDetailDto GetClaim();

        bool CheckPermission(string permission);

        bool CheckRole(string role);
    }
}