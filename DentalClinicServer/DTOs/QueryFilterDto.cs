namespace DentalClinicServer.DTOs {
    public record QueryFilterDto(
        string? Column = null,
        string? Contain = null
    );

    public record QuerySortDto(
        string? SortColumn = null,
        string? Ordering = "asc"
    );
}