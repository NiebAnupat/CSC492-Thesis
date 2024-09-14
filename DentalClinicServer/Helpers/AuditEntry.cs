using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DentalClinicServer.Helpers;
public class AuditEntry {
    public AuditEntry(EntityEntry entry) {
        Entry = entry;
        OldValues = new Dictionary<string, object>();
        NewValues = new Dictionary<string, object>();
        TemporaryProperties = new List<PropertyEntry>();
        ChangedColumns = new List<string>();
    }

    public EntityEntry Entry { get; }
    public Dictionary<string, object> OldValues { get; }
    public Dictionary<string, object> NewValues { get; }
    public List<PropertyEntry> TemporaryProperties { get; }
    public List<string> ChangedColumns { get; }

    public bool HasTemporaryProperties => TemporaryProperties.Any();

    public string TableName { get; set; }
}

