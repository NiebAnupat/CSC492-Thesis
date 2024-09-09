using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using server.Services.Auth;

namespace server.Attributes {
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class ClaimPermissionAttribute : AuthorizeAttribute, IAuthorizationFilter {
        private readonly string[] _permission;
        private readonly ClaimPermissionCondition _condition;

        public ClaimPermissionAttribute(params string[] permission) {
            _permission = permission;
            _condition = ClaimPermissionCondition.Any;
        }

        public ClaimPermissionAttribute(ClaimPermissionCondition condition, params string[] permission) {
            _permission = permission;
            _condition = condition;
        }

        public void OnAuthorization(AuthorizationFilterContext context) {
            var user = context.HttpContext.User;

            if (!user.Identity.IsAuthenticated) {
                context.Result = new UnauthorizedResult();
                return;
            }

            //get token
            var token = ((string) context.HttpContext.Request.Headers["Authorization"]).Substring(7);

            //read token
            ILoginDetailServices loginService = new LoginDetailServices(token);

            var hasPermission = false;

            if (_condition == ClaimPermissionCondition.Any) {
                hasPermission = loginService.Permissions.Intersect(_permission).Any();
            } else {
                hasPermission = loginService.Permissions.Intersect(_permission).Count() == _permission.Length;
            }

            if (!hasPermission) {
                context.Result = new ForbidResult();
                return;
            }
        }
    }

    public enum ClaimPermissionCondition {
        Any,
        All
    }
}