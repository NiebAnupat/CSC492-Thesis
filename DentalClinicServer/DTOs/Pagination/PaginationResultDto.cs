namespace DentalClinicServer.DTOs {
    public class PaginationResultDto {
        public double TotalAmountRecords { get; set; }
        public double TotalAmountPages { get; set; }
        public double CurrentPage { get; set; }
        public double RecordsPerPage { get; set; }
        public int PageIndex { get; set; }
    }
}