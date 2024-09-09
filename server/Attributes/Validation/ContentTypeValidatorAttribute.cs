using System.ComponentModel.DataAnnotations;

namespace server.Attributes {
    public class ContentTypeValidatorAttribute : ValidationAttribute {
        private readonly string[] _validContentTypes;
        private readonly string[] _imageContentTypes = new string[] { "image/jpeg", "image/jpg", "image/png", "image/gif" };

        public ContentTypeValidatorAttribute(string[] ValidContentTypes) {
            _validContentTypes = ValidContentTypes;
        }

        public ContentTypeValidatorAttribute(ContentTypeGroup contentTypeGroup) {
            switch (contentTypeGroup) {
                case ContentTypeGroup.Image:
                    _validContentTypes = _imageContentTypes;
                    break;
            }
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext) {
            if (value == null) {
                return ValidationResult.Success;
            }

            IFormFile formFile = value as IFormFile;

            if (formFile == null) {
                return ValidationResult.Success;
            }

            if (!_validContentTypes.Contains(formFile.ContentType)) {
                return new ValidationResult($"Content-Type should be one of the following: {string.Join(",", _validContentTypes)}");
            }

            return ValidationResult.Success;
        }

        public enum ContentTypeGroup {
            Image
        }
    }
}