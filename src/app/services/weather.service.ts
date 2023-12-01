import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { ApiResponse } from '../models/api-excel-response';
import { WeatherRecord } from '../models/weather-record';
import { WeatherRecordDetails } from '../models/weather-record-details';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl: string = '';

  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }

  constructor(private http: HttpClient) {}

  handleError(error: any): Observable<ApiResponse> {
    if (error.status === 0) {
      const networkError = new Error(
        "Network error. Server couldn't be reached. Please check your internet connection."
      );
      return of(networkError);
    } else {
      return of(
        error.error != null && error.error.message != null ? error.error : error
      );
    }
  }

  private makeWeatherGetRequest(url: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(url).pipe(
      tap((response: ApiResponse) => response),
      catchError(this.handleError)
    );
  }

  getWeatherDetailsById(id: number, limit: number): Observable<ApiResponse> {
    const url = `${this.baseUrl}/biggerThanId/?lastId=${id}&limit=${limit}`;
    return this.makeWeatherGetRequest(url);
  }

  getWeatherDetails(offset: number, limit: number): Observable<ApiResponse> {
    const url = `${this.baseUrl}?offset=${offset}&limit=${limit}`;
    return this.makeWeatherGetRequest(url);
  }

  getTotalWeatherRecords(): Observable<ApiResponse> {
    const url = `${this.baseUrl}/total`;
    return this.makeWeatherGetRequest(url);
  }

  getTotalWeatherRecordsWithinRange(
    startDate: Date,
    endDate: Date
  ): Observable<ApiResponse> {
    const url = `${
      this.baseUrl
    }/totalInDateRange?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    return this.makeWeatherGetRequest(url);
  }

  getWeatherRecordsInDateRange(
    id: number,
    limit: number,
    startDate: Date,
    endDate: Date
  ): Observable<ApiResponse> {
    const url = `${
      this.baseUrl
    }/inDateRange/?lastId=${id}&limit=${limit}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    return this.makeWeatherGetRequest(url);
  }

  private makeWeatherUploadRequest(
    endpointPath: string,
    selectedFile: File
  ): Observable<ApiResponse> {
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

  onUploadBatch(selectedFile: File): Observable<ApiResponse> {
    const endpointPath = `${this.baseUrl}/Upload/Batch`;
    return this.makeWeatherUploadRequest(endpointPath, selectedFile);
  }

  onUpload(selectedFile: File): Observable<ApiResponse> {
    const endpointPath = `${this.baseUrl}/Upload`;
    return this.makeWeatherUploadRequest(endpointPath, selectedFile);
  }

  generateMockData(): WeatherRecord[] {
    const mockData: WeatherRecord[] = [];

    for (let i = 0; i < 20; i++) {
      const record = new WeatherRecord();
      record.date = new Date();
      record.temperature = `${Math.floor(Math.random() * 30) + 50}°C`;
      record.humidity = Math.floor(Math.random() * 100);
      record.dewPoint = Math.floor(Math.random() * 20) + 10;
      record.pressure = Math.floor(Math.random() * 1000) + 900;
      record.windDirection = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][
        Math.floor(Math.random() * 8)
      ];
      record.windSpeed = Math.floor(Math.random() * 20) + 5;
      record.cloudiness = Math.floor(Math.random() * 100);
      record.cloudBase = Math.floor(Math.random() * 5000) + 1000;
      record.visibility = Math.floor(Math.random() * 10) + 1;

      const details = new WeatherRecordDetails();
      details.description = 'Lorem ipsum';

      record.weatherRecordDetails = details;

      mockData.push(record);
    }

    return mockData;
  }
}
