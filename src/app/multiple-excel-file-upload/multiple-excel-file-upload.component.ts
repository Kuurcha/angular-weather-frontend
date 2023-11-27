import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
@Component({
  selector: 'app-multiple-excel-file-upload',
  templateUrl: './multiple-excel-file-upload.component.html',
  styleUrls: ['./multiple-excel-file-upload.component.scss'],
})
export class MultipleExcelFileUploadComponent implements OnInit {
  private baseUrl = 'https://localhost:7090/WeatherForecast/Upload';

  selectedFiles: FileList | null = null;
  responseLabel: string | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onUpload(): void {
    if (this.selectedFiles) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append(
          'files',
          this.selectedFiles[i],
          this.selectedFiles[i].name
        );
      }

      this.http
        .post(this.baseUrl, formData)
        .pipe(
          tap((response: any) => {
            // Handle the API response
            this.responseLabel = response.message;
            console.log(response);
          }),
          catchError((error: any) => {
            // Handle error
            this.responseLabel = error.error.message;
            console.error(error);
            return of(); // You can return an observable with a default value or handle the error as needed
          })
        )
        .subscribe();
    }
  }

  ngOnInit(): void {}
}
