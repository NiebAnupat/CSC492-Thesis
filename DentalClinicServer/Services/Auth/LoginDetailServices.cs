using DentalClinicServer.DTOs.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace DentalClinicServer.Services.Auth {
    public class LoginDetailServices : ILoginDetailServices {
        public LoginDetailServices(IHttpContextAccessor accessor) {
            if (accessor.HttpContext == null) throw new ArgumentNullException(nameof(accessor.HttpContext));

            _httpContext = accessor.HttpContext;
            if (_httpContext.Request.Headers.Authorization.IsNullOrEmpty()) {
                _token = string.Empty;
                _jwtToken = new JwtSecurityToken();
            } else {
                _token = _httpContext.Request.Headers["Authorization"].ToString()[7..];
                _jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(_token);
            }
        }

        public LoginDetailServices(string token) {
            _token = token;
            _jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(token);
        }

        private readonly string _token;

        private readonly JwtSecurityToken _jwtToken;

        private HttpContext _httpContext;

        public string Token {
            get {
                return _token;
            }
        }

        public string[] Roles {
            get {
                return GetClaims(LoginDetailClaim.Role);
            }
        }

        public string[] Permissions {
            get {
                return GetClaims(LoginDetailClaim.Permission);
            }
        }

        public bool IsLogin => _jwtToken.ValidTo > DateTime.UtcNow;

        public bool CheckPermission(string permission) {
            return Permissions.Any(_ => _.Equals(permission));
        }

        public bool CheckRole(string role) {
            return Roles.Any(_ => _.Equals(role)); ;
        }

        public LoginDetailDto GetClaim() {
            var subject = GetClaim<string?>(LoginDetailClaim.Subject);
            var userId = GetClaim<int?>(LoginDetailClaim.UserId);

            return new LoginDetailDto(
                this.Token,
                subject
                    ?? throw new ArgumentException($"'Subject' cannot be null."),
                userId
                    ?? throw new ArgumentException($"'UserId' cannot be null."),
                GetClaim<string>(LoginDetailClaim.EmployeeCode),
                GetClaim<string>(LoginDetailClaim.FirstName),
                GetClaim<string>(LoginDetailClaim.LastName),
                GetClaim<int>(LoginDetailClaim.BranchId),
                GetClaim<string>(LoginDetailClaim.BranchDetail)
            );
        }

        public T GetClaim<T>(string @type) {
            var value = _jwtToken.Claims.Where(_ => _.Type == @type).FirstOrDefault()?.Value ?? null;

            var t = typeof(T);

            if (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(Nullable<>)) {
                if (value == null)
                    return default(T);
                t = Nullable.GetUnderlyingType(t);
            }

            return (T) Convert.ChangeType(value, t);
        }

        public string[] GetClaims(string @type) {
            if (!_jwtToken.Claims.Any(_ => _.Type == @type)) return Array.Empty<string>();
            return _jwtToken.Claims.Where(_ => _.Type == @type).Select(_ => _.Value).ToArray();
        }
    }

    public static class LoginDetailClaim {
        // Scope : profile

        /// <summary>
        /// Guid ของ User
        /// </summary>
        public const string Subject = "sub";

        /// <summary>
        /// Permission ของ User
        /// </summary>
        public const string Permission = "permission";

        /// <summary>
        /// Role ของ User
        /// </summary>
        public const string Role = "role";

        /// <summary>
        /// User Id ของ User
        /// </summary>
        public const string UserId = "user_id";

        /// <summary>
        /// รหัสพนักงาน
        /// </summary>
        public const string EmployeeCode = "employee_code";

        /// <summary>
        /// ชื่อพนักงาน
        /// </summary>
        public const string FirstName = "employee_firstname";

        /// <summary>
        /// นามสกุลพนักงาน
        /// </summary>
        public const string LastName = "employee_lastname";

        /// <summary>
        /// รหัสสาขา
        /// </summary>
        public const string BranchId = "employee_branchid";

        /// <summary>
        /// ชื่อสาขา
        /// </summary>
        public const string BranchDetail = "employee_branchname";

        // Scope : employee_profile

        /// <summary>
        /// ชื่อผู้ใช้งาน (ต้องใช้ scope : employee_profile)
        /// </summary>
        public const string Username = "Username";

        /// <summary>
        /// ตัวเลข Employee ใน Datacenter (ต้องใช้ scope : employee_profile)
        /// </summary>
        public const string EmployeeId = "Employee_ID";

        /// <summary>
        /// ตัวเลข Person ใน Datacenter (ต้องใช้ scope : employee_profile)
        /// </summary>
        public const string PersonId = "Person_ID";

        /// <summary>
        /// ชื่อ-นามสกุลพนักงาน (ต้องใช้ scope : employee_profile)
        /// </summary>
        public const string FullName = "FullName";

        // Scope : employee_branch

        /// <summary>
        /// รหัสภาค (ต้องใช้ scope : employee_branch)
        /// </summary>
        public const string AreaId = "Area_ID";

        /// <summary>
        /// ชื่อภาค (ต้องใช้ scope : employee_branch)
        /// </summary>
        public const string AreaDetail = "AreaDetail";

        // Scope : employee_department

        /// <summary>
        /// รหัสแผนก (ต้องใช้ scope : employee_department)
        /// </summary>
        public const string DepartmentId = "Department_ID";

        /// <summary>
        /// ชื่อแผนก (ต้องใช้ scope : employee_department)
        /// </summary>
        public const string DepartmentDetail = "DepartmentDetail";

        // Scope : employee_team

        /// <summary>
        /// รหัสทีม (ต้องใช้ scope : employee_team)
        /// </summary>
        public const string EmployeeTeamId = "EmployeeTeam_ID";

        /// <summary>
        /// ชื่อทีม (ต้องใช้ scope : employee_team)
        /// </summary>
        public const string EmployeeTeamDetail = "EmployeeTeamDetail";

        // Scope : employee_position

        /// <summary>
        /// รหัสตำแหน่ง (ต้องใช้ scope : employee_position)
        /// </summary>
        public const string EmployeePositionId = "EmployeePosition_ID";

        /// <summary>
        /// ชื่อตำแหน่ง (ต้องใช้ scope : employee_position)
        /// </summary>

        public const string EmployeePositionDetail = "EmployeePositionDetail";
    }
}