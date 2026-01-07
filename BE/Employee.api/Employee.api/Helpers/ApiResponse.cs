namespace Employee.api.Helpers
{
    public class ApiResponse
    {
        public int StatusCode { get; }
        public int? ErrorCode { get; }
        public string? Message { get; }
        public object? Data { get; }

        public ApiResponse(int statusCode, object? data = null, string? message = null, int? errorCode = null)
        {
            StatusCode = statusCode;
            Data = data;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
            ErrorCode = errorCode;
        }

        private static string? GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                200 => "Success",
                201 => "Created",
                204 => "No Content",
                400 => "Bad Request",
                401 => "Unauthorized",
                404 => "Not Found",
                500 => "Internal Server Error",
                _ => null
            };
        }
    }
}
