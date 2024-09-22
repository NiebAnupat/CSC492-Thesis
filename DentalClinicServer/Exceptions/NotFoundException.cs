namespace DentalClinicServer.Exceptions {
    public class NotFoundException : Exception {
        public NotFoundException(string message) : base(message) { }

        // public NotFoundException(string objectTypeName) {
        //     ObjectTypeName = objectTypeName;
        // }

        // public override string Message => $"Object [{ObjectTypeName}] is not found.";
    }
}
