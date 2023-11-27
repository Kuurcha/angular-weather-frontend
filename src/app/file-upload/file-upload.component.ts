import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  // apiMessage: string = '';
  // files: File[] = [];

  // constructor(private http: HttpClient) {}

  // onFileChange(event: any) {
  //   this.files = event.target.files;
  // }

  // uploadFiles() {
  //   const formData = new FormData();

  //   for (let i = 0; i < this.files.length; i++) {
  //     formData.append('files[]', this.files[i]);
  //   }

  //   console.log(formData);
  //   // this.http.post<any>('your-api-endpoint', formData).subscribe(
  //   //   (response) => {
  //   //     this.apiMessage = response.message;
  //   //   },
  //   //   (error) => {
  //   //     console.error('Error uploading files:', error);
  //   //     this.apiMessage = 'Error uploading files.';
  //   //   }
  //   // );
  // }

  ngOnInit(): void {}
}
