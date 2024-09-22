using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.AppointmentStatus;
using DentalClinicServer.DTOs.Master.AuditAction;
using DentalClinicServer.DTOs.Master.District;
using DentalClinicServer.DTOs.Master.ExpertType;
using DentalClinicServer.DTOs.Master.Gender;
using DentalClinicServer.DTOs.Master.Package;
using DentalClinicServer.DTOs.Master.PaymentMethod;
using DentalClinicServer.DTOs.Master.PaymentStatus;
using DentalClinicServer.DTOs.Master.ProductType;
using DentalClinicServer.DTOs.Master.ProviderType;
using DentalClinicServer.DTOs.Master.Province;
using DentalClinicServer.DTOs.Master.StockType;
using DentalClinicServer.DTOs.Master.SubDistrict;
using DentalClinicServer.DTOs.Master.TreatmentRecordField;
using DentalClinicServer.DTOs.Master.UserType;
using DentalClinicServer.Models;
using DentalClinicServer.Services.Master.AppointmentStatus;
using DentalClinicServer.Services.Master.AuditAction;
using DentalClinicServer.Services.Master.District;
using DentalClinicServer.Services.Master.ExpertType;
using DentalClinicServer.Services.Master.Gender;
using DentalClinicServer.Services.Master.Package;
using DentalClinicServer.Services.Master.PaymentMethod;
using DentalClinicServer.Services.Master.PaymentStatus;
using DentalClinicServer.Services.Master.ProductType;
using DentalClinicServer.Services.Master.ProviderType;
using DentalClinicServer.Services.Master.Province;
using DentalClinicServer.Services.Master.StockType;
using DentalClinicServer.Services.Master.SubDistrict;
using DentalClinicServer.Services.Master.TreatmentRecordField;
using DentalClinicServer.Services.Master.UserType;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class MasterController : ControllerBase {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly Serilog.ILogger _logger;

        private readonly IProvinceService _provinceService;
        private readonly IDistrictService _districtService;
        private readonly ISubDistrictService _subDistrictService;

        private readonly IAppointmentStatusService _appointmentStatusService;
        private readonly IAuditActionService _auditActionService;
        private readonly IExpertTypeService _expertTypeService;
        private readonly IGenderService _genderService;
        private readonly IPackageService _packageService;
        private readonly IPaymentMethodService _paymentMethodService;
        private readonly IPaymentStatusService _paymentStatusService;
        private readonly IProductTypeService _productTypeService;
        private readonly IProviderTypeService _providerTypeService;
        private readonly IStockTypeService _stockTypeService;
        private readonly ITreatmentRecordFieldService _treatmentRecordFieldService;
        private readonly IUserTypeService _userTypeService;


        public MasterController(
            IProvinceService provinceService, IDistrictService districtService, ISubDistrictService subDistrictService,
            IAppointmentStatusService appointmentStatusService, IAuditActionService auditActionService,
            IExpertTypeService expertTypeService, IGenderService genderService, IPackageService packageService,
            IPaymentMethodService paymentMethodService, IPaymentStatusService paymentStatusService,
            IProductTypeService productTypeService, IProviderTypeService providerTypeService,
            IStockTypeService stockTypeService, ITreatmentRecordFieldService treatmentRecordFieldService,
            IUserTypeService userTypeService,
            IHttpContextAccessor httpContextAccessor, Serilog.ILogger? logger = null) {
            _httpContextAccessor = httpContextAccessor;

            _provinceService = provinceService;
            _districtService = districtService;
            _subDistrictService = subDistrictService;

            _appointmentStatusService = appointmentStatusService;
            _auditActionService = auditActionService;
            _expertTypeService = expertTypeService;
            _genderService = genderService;
            _packageService = packageService;
            _paymentMethodService = paymentMethodService;
            _paymentStatusService = paymentStatusService;
            _productTypeService = productTypeService;
            _providerTypeService = providerTypeService;
            _stockTypeService = stockTypeService;
            _treatmentRecordFieldService = treatmentRecordFieldService;
            _userTypeService = userTypeService;

            _logger = logger is null
                ? Serilog.Log.ForContext<MasterController>()
                : logger.ForContext<MasterController>();
        }

        #region ThailandAdministrativeDivisions

        #region Province

        [HttpGet("Province")]
        public async Task<ServiceResponse<List<ProvinceDto>>>
            GetProvinces([FromQuery] PaginationDto paginationDto
                , [FromQuery] QueryFilterDto filterDto
                , [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetProvinces);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _provinceService.GetProvinces(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.provinceDtos, result.pagination);
        }

        [HttpGet("Province/{id}")]
        public async Task<ServiceResponse<ProvinceDtoIncludeDetail>> GetProvince(int id) {
            const string actionName = nameof(GetProvince);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _provinceService.GetProvince(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region District

        [HttpGet("District")]
        public async Task<ServiceResponse<List<DistrictDto>>>
            GetDistricts([FromQuery] PaginationDto paginationDto
                , [FromQuery] QueryFilterDto filterDto
                , [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetDistricts);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _districtService.GetDistricts(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.districtDtos, result.pagination);
        }

        [HttpGet("District/{id}")]
        public async Task<ServiceResponse<DistrictDtoIncludeDetail>> GetDistrict(int id) {
            const string actionName = nameof(GetDistrict);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _districtService.GetDistrict(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region SubDistrict

        [HttpGet("SubDistrict")]
        public async Task<ServiceResponse<List<SubDistrictDto>>>
            GetSubDistricts([FromQuery] PaginationDto paginationDto
                , [FromQuery] QueryFilterDto filterDto
                , [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetSubDistricts);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _subDistrictService.GetSubDistricts(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.subDistrictDtos, result.pagination);
        }

        [HttpGet("SubDistrict/{id}")]
        public async Task<ServiceResponse<SubDistrictDto>> GetSubDistrict(int id) {
            const string actionName = nameof(GetSubDistrict);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _subDistrictService.GetSubDistrict(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #endregion

        #region AppointmentStatus

        [HttpGet("AppointmentStatus")]
        public async Task<ServiceResponse<List<AppointmentStatusDto>>>
            GetAppointmentStatuses([FromQuery] PaginationDto paginationDto
                , [FromQuery] QueryFilterDto filterDto
                , [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetAppointmentStatuses);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _appointmentStatusService.GetAppointmentStatuses(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.appointmentStatusDtos, result.pagination);
        }

        [HttpGet("AppointmentStatus/{id}")]
        public async Task<ServiceResponse<AppointmentStatusDto>> GetAppointmentStatus(int id) {
            const string actionName = nameof(GetAppointmentStatus);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _appointmentStatusService.GetAppointmentStatus(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region AuditAction

        [HttpGet("AuditAction")]
        public async Task<ServiceResponse<List<AuditActionDto>>>
            GetAuditActions([FromQuery] PaginationDto paginationDto
                , [FromQuery] QueryFilterDto filterDto
                , [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetAuditActions);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _auditActionService.GetAuditActions(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.auditActionDtos, result.pagination);
        }

        [HttpGet("AuditAction/{id}")]
        public async Task<ServiceResponse<AuditActionDto>> GetAuditAction(int id) {
            const string actionName = nameof(GetAuditAction);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _auditActionService.GetAuditAction(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region ExpertType

        [HttpGet("ExpertType")]
        public async Task<ServiceResponse<List<ExpertTypeDto>>> GetExpertTypes([FromQuery] PaginationDto paginationDto,
            [FromQuery] QueryFilterDto filterDto, [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetExpertTypes);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _expertTypeService.GetExpertTypes(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.expertTypeDtos, result.pagination);
        }

        [HttpGet("ExpertType/{id}")]
        public async Task<ServiceResponse<ExpertTypeDto>> GetExpertType(int id) {
            const string actionName = nameof(GetExpertType);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _expertTypeService.GetExpertType(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region Gender

        [HttpGet("Gender")]
        public async Task<ServiceResponse<List<GenderDto>>> GetGenders([FromQuery] PaginationDto paginationDto,
            [FromQuery] QueryFilterDto filterDto, [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetGenders);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _genderService.GetGenders(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.genderDtos, result.pagination);
        }

        [HttpGet("Gender/{id}")]
        public async Task<ServiceResponse<GenderDto>> GetGender(int id) {
            const string actionName = nameof(GetGender);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _genderService.GetGender(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region Package

        [HttpGet("Package")]
        public async Task<ServiceResponse<List<PackageDto>>> GetPackages([FromQuery] PaginationDto paginationDto,
            [FromQuery] QueryFilterDto filterDto, [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetPackages);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _packageService.GetPackages(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.packageDtos, result.pagination);
        }

        [HttpGet("Package/{id}")]
        public async Task<ServiceResponse<PackageDto>> GetPackage(int id) {
            const string actionName = nameof(GetPackage);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _packageService.GetPackage(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region PaymentMethod

        [HttpGet("PaymentMethod")]
        public async Task<ServiceResponse<List<PaymentMethodDto>>> GetPaymentMethods(
            [FromQuery] PaginationDto paginationDto, [FromQuery] QueryFilterDto filterDto,
            [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetPaymentMethods);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _paymentMethodService.GetPaymentMethods(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.paymentMethodDtos, result.pagination);
        }

        [HttpGet("PaymentMethod/{id}")]
        public async Task<ServiceResponse<PaymentMethodDto>> GetPaymentMethod(int id) {
            const string actionName = nameof(GetPaymentMethod);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _paymentMethodService.GetPaymentMethod(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region PaymentStatus

        [HttpGet("PaymentStatus")]
        public async Task<ServiceResponse<List<PaymentStatusDto>>> GetPaymentStatuses(
            [FromQuery] PaginationDto paginationDto, [FromQuery] QueryFilterDto filterDto,
            [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetPaymentStatuses);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _paymentStatusService.GetPaymentStatuses(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.paymentStatusDtos, result.pagination);
        }

        [HttpGet("PaymentStatus/{id}")]
        public async Task<ServiceResponse<PaymentStatusDto>> GetPaymentStatus(int id) {
            const string actionName = nameof(GetPaymentStatus);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _paymentStatusService.GetPaymentStatus(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region ProductType

        [HttpGet("ProductType")]
        public async Task<ServiceResponse<List<ProductTypeDto>>> GetProductTypes(
            [FromQuery] PaginationDto paginationDto, [FromQuery] QueryFilterDto filterDto,
            [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetProductTypes);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _productTypeService.GetProductTypes(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.productTypeDtos, result.pagination);
        }

        [HttpGet("ProductType/{id}")]
        public async Task<ServiceResponse<ProductTypeDto>> GetProductType(int id) {
            const string actionName = nameof(GetProductType);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _productTypeService.GetProductType(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region ProviderType

        [HttpGet("ProviderType")]
        public async Task<ServiceResponse<List<ProviderTypeDto>>> GetProviderTypes(
            [FromQuery] PaginationDto paginationDto, [FromQuery] QueryFilterDto filterDto,
            [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetProviderTypes);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _providerTypeService.GetProviderTypes(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.providerTypeDtos, result.pagination);
        }

        [HttpGet("ProviderType/{id}")]
        public async Task<ServiceResponse<ProviderTypeDto>> GetProviderType(int id) {
            const string actionName = nameof(GetProviderType);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _providerTypeService.GetProviderType(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region StockType

        [HttpGet("StockType")]
        public async Task<ServiceResponse<List<StockTypeDto>>> GetStockTypes([FromQuery] PaginationDto paginationDto,
            [FromQuery] QueryFilterDto filterDto, [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetStockTypes);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _stockTypeService.GetStockTypes(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.stockTypeDtos, result.pagination);
        }

        [HttpGet("StockType/{id}")]
        public async Task<ServiceResponse<StockTypeDto>> GetStockType(int id) {
            const string actionName = nameof(GetStockType);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _stockTypeService.GetStockType(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region TreatmentRecordField

        [HttpGet("TreatmentRecordField")]
        public async Task<ServiceResponse<List<TreatmentRecordFieldDto>>> GetTreatmentRecordFields(
            [FromQuery] PaginationDto paginationDto, [FromQuery] QueryFilterDto filterDto,
            [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetTreatmentRecordFields);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _treatmentRecordFieldService.GetTreatmentRecordFields(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.treatmentRecordFieldDtos, result.pagination);
        }

        [HttpGet("TreatmentRecordField/{id}")]
        public async Task<ServiceResponse<TreatmentRecordFieldDto>> GetTreatmentRecordField(int id) {
            const string actionName = nameof(GetTreatmentRecordField);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _treatmentRecordFieldService.GetTreatmentRecordField(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion

        #region UserType

        [HttpGet("UserType")]
        public async Task<ServiceResponse<List<UserTypeDto>>> GetUserTypes([FromQuery] PaginationDto paginationDto,
            [FromQuery] QueryFilterDto filterDto, [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetUserTypes);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _userTypeService.GetUserTypes(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result.userTypeDtos, result.pagination);
        }

        [HttpGet("UserType/{id}")]
        public async Task<ServiceResponse<UserTypeDto>> GetUserType(int id) {
            const string actionName = nameof(GetUserType);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

            var result = await _userTypeService.GetUserType(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
            return ResponseResult.Success(result);
        }

        #endregion
    }
}
