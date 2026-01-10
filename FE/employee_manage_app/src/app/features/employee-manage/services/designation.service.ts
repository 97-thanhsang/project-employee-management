import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Designation } from '../models';
import { ApiResponse } from '../../../core/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  private apiUrl = `${environment.apiUrl}/DesignationMaster`;

  constructor(private http: HttpClient) { }

  /**
   * Get all designations
   * @returns Observable<ApiResponse<Designation[]>>
   */
  getAllDesignations(): Observable<ApiResponse<Designation[]>> {
    return this.http.get<ApiResponse<Designation[]>>(this.apiUrl);
  }

  /**
   * Get designation by ID
   * @param id Designation ID
   * @returns Observable<ApiResponse<Designation>>
   */
  getDesignationById(id: number): Observable<ApiResponse<Designation>> {
    return this.http.get<ApiResponse<Designation>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create new designation
   * @param designation Designation data
   * @returns Observable<ApiResponse<Designation>>
   */
  createDesignation(designation: Designation): Observable<ApiResponse<Designation>> {
    return this.http.post<ApiResponse<Designation>>(this.apiUrl, designation);
  }

  /**
   * Update existing designation
   * @param id Designation ID
   * @param designation Updated designation data
   * @returns Observable<ApiResponse<Designation>>
   */
  updateDesignation(id: number, designation: Designation): Observable<ApiResponse<Designation>> {
    return this.http.put<ApiResponse<Designation>>(`${this.apiUrl}/${id}`, designation);
  }

  /**
   * Delete designation
   * @param id Designation ID
   * @returns Observable<ApiResponse<void>>
   */
  deleteDesignation(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
