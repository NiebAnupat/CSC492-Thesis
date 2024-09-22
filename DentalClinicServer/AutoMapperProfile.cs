using AutoMapper;
using DentalClinicServer.DTOs.Customer;
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

namespace DentalClinicServer {
    public class AutoMapperProfile : Profile {
        public AutoMapperProfile() {
            /*
             * CreateMap<SampleMessage, ExampleModels>()
             *     .ForMember(_ => _.ExampleName, _ => _.MapFrom(_ => _.Name))
             *     .ReverseMap();
             *
             * CreateMap<ExampleModels, GetExampleReponseDto>();
             */

            #region Master

            #region Province

            // Get Set
            CreateMap<Province, ProvinceDto>().ReverseMap();
            CreateMap<Province, ProvinceDtoIncludeDetail>().ReverseMap();

            #endregion

            #region District

            // Get Set
            CreateMap<District, DistrictDto>().ReverseMap();

            #endregion

            #region SubDistrict

            // Get Set
            CreateMap<SubDistrict, SubDistrictDto>().ReverseMap();

            #endregion

            #region Gender

            // Get Set
            CreateMap<Gender, GenderDto>().ReverseMap();

            #endregion

            #region StockType

            // Get Set
            CreateMap<StockType, StockTypeDto>().ReverseMap();

            #endregion

            #region UserType

            // Get Set
            CreateMap<UserType, UserTypeDto>().ReverseMap();

            #endregion

            #region ExpertType

            // Get Set
            CreateMap<ExpertType, ExpertTypeDto>().ReverseMap();

            #endregion

            #region ProductType

            // Get Set
            CreateMap<ProductType, ProductTypeDto>().ReverseMap();

            #endregion

            #region ProviderType

            // Get Set
            CreateMap<ProviderType, ProviderTypeDto>().ReverseMap();

            #endregion

            #region PaymentMethod

            // Get Set
            CreateMap<PaymentMethod, PaymentMethodDto>().ReverseMap();

            #endregion

            #region PaymentStatus

            // Get Set
            CreateMap<PaymentStatus, PaymentStatusDto>().ReverseMap();

            #endregion

            #region AppointmentStatus

            // Get Set
            CreateMap<AppointmentStatus, AppointmentStatusDto>().ReverseMap();

            #endregion

            #region AuditAction

            // Get Set
            CreateMap<AuditAction, AuditActionDto>().ReverseMap();

            #endregion

            #region Package

            // Get Set
            CreateMap<Package, PackageDto>().ReverseMap();

            #endregion

            #region TreatmentRecordField

            // Get Set
            CreateMap<TreatmentRecordField, TreatmentRecordFieldDto>().ReverseMap();

            #endregion

            #endregion

            #region Customer

            // Create Set
            CreateMap<CustomerRequestDto, Customer>().ReverseMap();

            // Get Set
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<Customer, CustomerDtoIncludeDetail>().ReverseMap();

            // Update Set
            CreateMap<UpdateCustomerRequestDto, Customer>().ReverseMap();

            #endregion
        }
    }
}
