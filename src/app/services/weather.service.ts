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
          return of(error.error ?? error);
        })
      );
    } else {
      const apiResponse = new ApiResponse();
      apiResponse.message = 'No file selected';
      return of(apiResponse);
    }
  }

  // onUploadDepricated(selectedFiles: FileList): Observable<ApiResponse> {
  //   let endpointPath = this.baseUrl + '/Upload';
  //   if (selectedFiles) {
  //     const formData = new FormData();
  //     for (let i = 0; i < selectedFiles.length; i++) {
  //       formData.append('files', selectedFiles[i], selectedFiles[i].name);
  //     }

  //     return this.http.post(endpointPath, formData).pipe(
  //       tap((response: any) => {
  //         return of(response);
  //       }),
  //       catchError((error: any) => {
  //         return of(error.error ?? error);
  //       })
  //     );
  //   } else {
  //     const apiResponse = new ApiResponse();
  //     apiResponse.message = ['No request was made'];
  //     return of(apiResponse);
  //   }
  // }
}
