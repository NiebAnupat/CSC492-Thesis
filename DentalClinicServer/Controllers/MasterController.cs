﻿using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.Province;
using DentalClinicServer.Models;
using DentalClinicServer.Services.Master.Province;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class MasterController : ControllerBase {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly Serilog.ILogger _logger;

        private readonly IProvinceService _provinceService;


        public MasterController(IProvinceService provinceService,
            IHttpContextAccessor httpContextAccessor, Serilog.ILogger? logger = null) {
            _httpContextAccessor = httpContextAccessor;

            _provinceService = provinceService;

            _logger = logger is null
                ? Serilog.Log.ForContext<MasterController>()
                : logger.ForContext<MasterController>();
        }

        [HttpGet("Province")]
        public async Task<ServiceResponse<List<ProvinceDto>>>
            GetProvinces([FromQuery] PaginationDto paginationDto
                , [FromQuery] QueryFilterDto filterDto
                , [FromQuery] QuerySortDto sortDto) {
            const string actionName = nameof(GetProvinces);
            _logger.Debug("[{ActionName}] - Started : {date}", actionName, System.DateTime.Now);

            var result = await _provinceService.GetProvinces(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Ended : {date}", actionName, System.DateTime.Now);
            return ResponseResult.Success(result.provinceDtos, result.pagination);
        }
    }
}
