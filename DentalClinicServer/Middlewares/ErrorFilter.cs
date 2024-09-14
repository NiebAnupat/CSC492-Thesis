using DentalClinicServer.Exceptions;
using DentalClinicServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Data.SqlClient;
using Serilog;

namespace DentalClinicServer.Middlewares {
    public class ErrorFilter : IExceptionFilter, IOrderedFilter {
        public int Order { get; set; } = int.MinValue;

        public ErrorFilter() {
        }

        private const string _defaultErrorMessage = "Server's unexpect error. Please contact Adminstrator.";
        private const string _errorLogTemplate = "{Middleware} Return error response [Code={Code},Message={Message},Error={Error}]";

        public void OnException(ExceptionContext context) {
            var result = new ServiceResponse<string>() { Code = 900, Message = "Unknown Error" };

            /***************************************
             *      500 Internal Server Error      *
             ***************************************/

            if (context.Exception is SqlException) {
                result = ResponseResult.Failure<string>(_defaultErrorMessage, 503);

                context.HttpContext.Response.StatusCode = 503;
                context.Result = new ObjectResult(result);

                Log.Fatal(context.Exception, _errorLogTemplate, "Exception Filter", 503, result.Message, "Cound not connect to database");
                return;
            }

            if (context.Exception is HttpRequestException) {
                result = ResponseResult.Failure<string>(_defaultErrorMessage, 500);

                context.HttpContext.Response.StatusCode = 500;
                context.Result = new ObjectResult(result);

                Log.Fatal(context.Exception, _errorLogTemplate, "Exception Filter", 500, result.Message, "Network Error");
                return;
            }

            /***************************************
             *           400 Bad Request           *
             ***************************************/

            if (context.Exception is ArgumentNullException) {
                result = ResponseResult.Failure<string>("Missing required parameter.", 400);
            }

            if (context.Exception is System.ComponentModel.DataAnnotations.ValidationException) {
                result = ResponseResult.Failure<string>("Missing required parameter, invalid JSON body or data type.", 400);
            }

            if (context.Exception is AutoMapper.AutoMapperMappingException) {
                result = ResponseResult.Failure<string>(_defaultErrorMessage, 400);
                //if (!String.IsNullOrEmpty(context.Exception.Message)) result.ExceptionMessage = context.Exception.Message;

                Log.Fatal(context.Exception, _errorLogTemplate, "Exception Filter", 500, result.Message, "Invalid mapping in AutoMapper.");
                return;
            }

            /***************************************
             *        800 API Define Error         *
             ***************************************/

            if (context.Exception is ApiException) {
                result = ResponseResult.Failure<string>(context.Exception.Message, 801);
            }

            if (context.Exception is InvalidDateException) {
                result = ResponseResult.Failure<string>(context.Exception.Message, 802);
            }

            if (context.Exception is InvalidGUIDException) {
                result = ResponseResult.Failure<string>(context.Exception.Message, 803);
            }

            if (context.Exception is NotFoundException) {
                result = ResponseResult.Failure<string>(context.Exception.Message, 804);
            }

            if (context.Exception is NullException) {
                result = ResponseResult.Failure<string>(context.Exception.Message, 805);
            }

            Log.Warning(context.Exception, "{Middleware} Return error response [Code={Code},Message={Message}]", "Exception Filter", result.Code, result.Message);
            context.Result = new OkObjectResult(result);
        }
    }
}