namespace DentalClinicServer.DTOs.Auth {
    public class LoginDetailDto {
        public LoginDetailDto() {
        }

        public LoginDetailDto(string token, string subjectId, int userId, string employeeCode, string firstname, string lastname, int branchId, string branchname) {
            Token = token;
            SubjectId = subjectId;
            UserId = userId;
            EmployeeCode = employeeCode;
            Firstname = firstname;
            Lastname = lastname;
            BranchId = branchId;
            Branchname = branchname;
        }

        public string Token { get; set; }
        public string SubjectId { get; set; }
        public int UserId { get; set; }
        public string EmployeeCode { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public int BranchId { get; set; }
        public string Branchname { get; set; }
    }

    public class LoginDetailEmployeeProfile {
        public string? Username { get; set; }
        public int? EmployeeId { get; set; }
        public int? PersonId { get; set; }
        public string? FullName { get; set; }

        public virtual void SetEmployeeProfile(string? username, int? employeeId, int? personId, string? fullName) {
            Username = username;
            EmployeeId = employeeId;
            PersonId = personId;
            FullName = fullName;
        }
    }
}