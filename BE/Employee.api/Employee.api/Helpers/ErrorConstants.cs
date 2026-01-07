namespace Employee.api.Helpers
{
    public static class ErrorMessages
    {
        public const string ValidationError = "One or more validation errors occurred.";
        public const string NotFound = "The requested resource was not found.";
        public const string InternalServerError = "An internal server error has occurred.";
    }

    public static class ErrorCodes
    {
        public const int Validation = 40001;
        public const int NotFound = 40401;
        public const int InternalServerError = 50001;
    }
}
