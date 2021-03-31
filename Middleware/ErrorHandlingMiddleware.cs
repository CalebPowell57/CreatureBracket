using CreatureBracket.Exceptions;
using CreatureBracket.Misc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Threading.Tasks;
using System.Text.Json;
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

            var beautifyTuple = ExceptionBeautifier.Beautify(exception);

            if (beautifyTuple.Item2)
            {
                throw new ExpectedException(beautifyTuple.Item1, EErrorSeverityLevel.Low);
            }
            else
            {
                throw exception;
            }

            //var stream = context.Response.Body;
            //await JsonSerializer.SerializeAsync(stream, problem);
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
