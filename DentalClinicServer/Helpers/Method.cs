using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DentalClinicServer.Helpers;

public static class Method {
    //TODO: Implement the following methods
    public static int GetActionId(EntityState state) {
        return state switch {
            EntityState.Added => 2, // Create
            EntityState.Deleted => 3, // Delete
            EntityState.Modified => 4, // Update
            _ => 1 // Default
        };
    }

    public static string HashPassword(string password) {
        return BCrypt.Net.BCrypt.EnhancedHashPassword(password);
    }

    public static string GetRecordId(EntityEntry entry) {
        var keyName = entry.Metadata.FindPrimaryKey().Properties.Select(x => x.Name).Single();
        return entry.Property(keyName).CurrentValue.ToString();
    }

    public static string SerializeObject(object obj) {
        return JsonConvert.SerializeObject(obj);
    }

    public static string? GetBranchId() {
        // Logic to get the current branch ID
        return null;
    }

    public static int? GetCurrentUserTypeId() {
        // Logic to get the current user type ID
        return null;
    }

    public static string? GetCurrentUserId() {
        // Logic to get the current user ID
        return null;
    }
}
