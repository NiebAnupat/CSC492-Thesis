using AutoMapper;
using DentalClinicServer.DTOs.Master.District;
using DentalClinicServer.DTOs.Master.Gender;
using DentalClinicServer.DTOs.Master.Province;
using DentalClinicServer.DTOs.Master.SubDistrict;
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
            CreateMap<Province, ProvinceDtoIncludeDetails>().ReverseMap();

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

            #endregion
        }
    }
}
