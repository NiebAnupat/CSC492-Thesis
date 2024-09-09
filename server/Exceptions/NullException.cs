namespace server.Exceptions {
    public class NullException : AppExceptionBase {
        public NullException(string objectTypeName) {
            ObjectTypeName = objectTypeName;
        }

        public override string Message => $"This object [{ObjectTypeName}] value is null.";
    }
}