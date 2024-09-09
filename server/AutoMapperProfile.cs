using AutoMapper;

namespace server {
    public class AutoMapperProfile : Profile {
        public AutoMapperProfile() {
            /*
             * CreateMap<SampleMessage, ExampleModels>()
             *     .ForMember(_ => _.ExampleName, _ => _.MapFrom(_ => _.Name))
             *     .ReverseMap();
             * 
             * CreateMap<ExampleModels, GetExampleReponseDto>();
             */
        }
    }
}