using DentalClinicServer.DTOs.Master.Province;

namespace DentalClinicServer.Services.Master.Province;

public interface IProvinceService {
    Task<List<ProvinceDto>> GetProvinces();
    Task<ProvinceDto> GetProvince(int id);
    // Task<Models.Province> CreateProvince(Models.Province model);
    // Task<Models.Province> UpdateProvince(int id, Models.Province model);
    // Task<Models.Province> DeleteProvince(int id);
}
