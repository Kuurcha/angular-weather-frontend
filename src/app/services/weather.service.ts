import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { ApiResponse } from '../models/api-excel-response';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl: string = '';

  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }

  constructor(private http: HttpClient) {
    console.log('WeatherService constructor');
  }

  handleError(error: any): Observable<ApiResponse> {
    if (error.status === 0) {
      const networkError = new Error(
        "Network error. Server couldn't be reached. Please check your internet connection."
      );
      return of(networkError);
    } else {
      // Handle other errors
      return of(
        error.error != null && error.error.message != null ? error.error : error
      );
    }
  }

  getWeatherDetails(offset: number, limit: number): Observable<ApiResponse> {
    return this.http
      .get(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  getTotalWeatherRecords(): Observable<ApiResponse> {
    const url = `${this.baseUrl}/total`;
    return this.http.get<ApiResponse>(url).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  onUploadBatch(selectedFile: File): Observable<ApiResponse> {
    let endpointPath = this.baseUrl + '/Upload/Batch';

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);
      return this.http.post(endpointPath, formData).pipe(
        tap((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
    } else {
      const apiResponse = new ApiResponse();
      apiResponse.message = 'No file selected';
      return of(apiResponse);
    }
  }

  onUpload(selectedFile: File): Observable<ApiResponse> {
    let endpointPath = this.baseUrl + '/Upload';

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);
      return this.http.post(endpointPath, formData).pipe(
        tap((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
    } else {
      const apiResponse = new ApiResponse();
      apiResponse.message = 'No file selected';
      return of(apiResponse);
    }
  }
}
