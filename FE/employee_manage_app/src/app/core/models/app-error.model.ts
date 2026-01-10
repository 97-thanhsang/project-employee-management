export interface AppError {
    code?: string;
    message: string;
    details?: Record<string, string[]>; // Field-level errors, e.g., { "email": ["Invalid email format"] }
}
