using Microsoft.AspNetCore.Authorization;

namespace server {
    public class Permission {
        public const string Base = "Base";

        public static AuthorizationPolicy BasePermission
            = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .RequireClaim("employee_code")
                .RequireClaim("employee_firstname")
                .RequireClaim("employee_lastname")
                .RequireClaim("employee_branchid")
                .RequireClaim("employee_branchname")
                .Build();

        // TODO: หากมีการใช้ OAuth Persmission ให้ใส่ที่นี้

        public const string Test = "example:test_permission";

        public static AuthorizationPolicy TestPermission
            = new AuthorizationPolicyBuilder()
                .RequireClaim(Test)
                .Build();

        public const string Test2 = "example:test_permission2";

        public static AuthorizationPolicy Test2Permission
            = new AuthorizationPolicyBuilder()
                .RequireClaim(Test2)
                .Build();
    }
}