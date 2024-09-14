namespace DentalClinicServer.Exceptions {
    public class InvalidDateException : AppExceptionBase {
        public InvalidDateException(string objectTypeName, string keys) {
            ObjectTypeName = objectTypeName;
            Keys = keys;
        }

        public override string Message => $"Object [{ObjectTypeName}] ({Keys}) date is not valid.";
    }
}