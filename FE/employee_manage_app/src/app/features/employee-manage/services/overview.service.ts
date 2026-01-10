import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '@core/models/api-response.model';

@Injectable({
    providedIn: 'root'
})
export class OverviewService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    getEmployeeCount(): Observable<number> {
        // Fetch with large page size to get all records since we don't have a count endpoint
        const params = new HttpParams().set('PageSize', '10000');
        return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/EmployeeMaster`, { params }).pipe(
            map(response => response.data ? response.data.length : 0)
        );
    }

    getDepartmentCount(): Observable<number> {
        const params = new HttpParams().set('PageSize', '10000');
        return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/DepartmentMaster`, { params }).pipe(
            map(response => response.data ? response.data.length : 0)
        );
    }
}
