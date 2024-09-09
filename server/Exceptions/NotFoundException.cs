namespace server.Exceptions {
    public class NotFoundException : AppExceptionBase {
        public NotFoundException(string objectTypeName) {
            ObjectTypeName = objectTypeName;
        }

        public override string Message => $"Object [{ObjectTypeName}] is not found.";
    }
}