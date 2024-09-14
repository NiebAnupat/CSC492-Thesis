namespace DentalClinicServer.Exceptions {
    public enum ResponseType {
        BadRequest = 400,
        Conflict = 409,
        NoContent = 204,
        NotFound = 404,
        Unauthorized = 401,
        UnsupportMediaType = 415
    }

    //[Serializable]
    public class ApiException : Exception {
        public ResponseType ResponseType { get; private set; }

        private ApiException() {
        }

        public ApiException(string message) : base(message) {
            //base.Data["response"] = response;
        }

        /*protected ApiException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }*/
    }
}