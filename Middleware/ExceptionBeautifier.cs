using Microsoft.EntityFrameworkCore;
using System;

namespace CreatureBracket.Middleware
{
    public static class ExceptionBeautifier
    {
        private static readonly int _fkChildIndex = 1;
        private static readonly int _fkParentIndex = 2;

        private static readonly int _ixChildIndex = 1;
        private static readonly int _ixColumnIndex = 2;

        public static void Initialize() { }

        public static string Beautify(Exception exception)
        {
            if(exception.GetType() == typeof(DbUpdateException) 
                && exception.Source == "Microsoft.EntityFrameworkCore.Relational"
                && exception.InnerException != null)
            {
                if(exception.InnerException.Message.Contains("The DELETE statement conflicted with the REFERENCE constraint"))
                {
                    return BeautifyForeignKeyDeleteException(exception as DbUpdateException);
                }
                else if(exception.InnerException.Message.Contains("String or binary data would be truncated."))
                {
                    return BeautifyTruncatedException();
                }
                else if(exception.InnerException.Message.Contains("Cannot insert duplicate key row in object") && exception.InnerException.Message.Contains("with unique index"))
                {
                    return BeautifyUniqueIndexException(exception as DbUpdateException);
                }
            }

            return BeautifyGeneralException(exception);
        }

        private static string BeautifyGeneralException(Exception exception)
        {
            var message = exception.Message;

            while (exception.InnerException != null)
            {
                exception = exception.InnerException;

                message += " " + exception.Message;
            }

            return message;
        }

        private static string BeautifyForeignKeyDeleteException(DbUpdateException exception)
        {
            var foreignKeyMessage = exception.InnerException.Message;

            var index = foreignKeyMessage.IndexOf("\"FK_") + 1;

            var constraint = foreignKeyMessage.Substring(index);

            constraint = constraint.Substring(0, constraint.IndexOf("\""));

            var tables = constraint.Split("_");

            var parentTable = tables[_fkParentIndex];
            var childTable = tables[_fkChildIndex];

            return $"You cannot delete a \"{parentTable}\" record that has an attached \"{childTable}\" record.";
        }

        public static string BeautifyTruncatedException()
        {
            return "A value contains more characters than are allowed.";
        }

        public static string BeautifyUniqueIndexException(DbUpdateException exception)
        {
            var foreignKeyMessage = exception.InnerException.Message;

            var index = foreignKeyMessage.IndexOf("\'IX_") + 1;

            var constraint = foreignKeyMessage.Substring(index);

            constraint = constraint.Substring(0, constraint.IndexOf("\'"));

            var items = constraint.Split("_");

            var column = items[_ixColumnIndex];
            var childTable = items[_ixChildIndex];

            return $"You cannot have more than one {childTable} with the same value for \'{column}\'";
        }
    }
}
