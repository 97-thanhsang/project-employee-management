namespace Employee.api.Helpers
{
    public class QueryParameters
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;

        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string? SortBy { get; set; }
        public string? SortOrder { get; set; } // "asc" or "desc"
        public string? Filter { get; set; }
    }
}
