import { HttpErrorResponse } from '@angular/common/http';
import { AppError } from '@core/models/app-error.model';

/**
 * Maps an error object (usually from API) to a structured AppError
 * @param error The original error object
 * @param defaultMessage Fallback message if no specific message is found
 * @returns AppError
 */
export function mapToAppError(error: any, defaultMessage: string): AppError {
    if (error instanceof HttpErrorResponse) {
        return {
            code: error.status.toString(),
            message: error.error?.message || error.message || defaultMessage,
            details: error.error?.details // Field-level errors from BE
        };
    }
    return {
        message: defaultMessage
    };
}
