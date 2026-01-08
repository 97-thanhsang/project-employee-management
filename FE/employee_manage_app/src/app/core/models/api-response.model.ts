/**
 * Generic API Response Wrapper
 * Mô phỏng cấu trúc response từ backend .NET
 */
export interface ApiResponse<T> {
  statusCode: number;
  errorCode?: number;
  message?: string;
  data: T;
}
