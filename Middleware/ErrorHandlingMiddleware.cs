using CreatureBracket.Exceptions;
using CreatureBracket.Misc;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Threading.Tasks;
using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context, DatabaseContext smartContext, UnitOfWork unitOfWork)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex, unitOfWork);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception, UnitOfWork unitOfWork)
        {
            //await LogErrorAsync(exception, unitOfWork);

            var message = ExceptionBeautifier.Beautify(exception);

            var severityLevel = EErrorSeverityLevel.High;

            if(exception is ExpectedException expectedException)
            {
                severityLevel = expectedException.SeverityLevel;
            }

            var result = JsonConvert.SerializeObject(exception);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            await context.Response.WriteAsync(result);
        }

        //public static async Task LogErrorAsync(Exception exception, UnitOfWork unitOfWork)
        //{
        //    var errorMessage = new LogErrorDTO
        //    {
        //        Exception = exception.Message,
        //        InnerException = exception.InnerException?.Message,
        //        StackTrace = exception.StackTrace,
        //        Type = exception is ExpectedException ? ErrorType.Expected : ErrorType.Unexpected
        //    };

        //    try
        //    {
        //        var jwtInfo = new JwtInfo();

        //        if (unitOfWork.Accessor?.HttpContext != null)
        //        {
        //            jwtInfo.Configure(unitOfWork.Accessor.HttpContext.User);
        //        }

        //        await unitOfWork.ErrorRepository.LogError(errorMessage, jwtInfo.UserId);
        //        await unitOfWork.SaveAsync();
        //    }
        //    catch (Exception)
        //    {
        //        //don't do anything... may log this locally?
        //    }
        //}
    }
}
