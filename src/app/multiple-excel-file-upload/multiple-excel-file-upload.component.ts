import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
@Component({
  selector: 'app-multiple-excel-file-upload',
  templateUrl: './multiple-excel-file-upload.component.html',
  styleUrls: ['./multiple-excel-file-upload.component.scss'],
})
export class MultipleExcelFileUploadComponent implements OnInit {
  selectedFiles: FileList | null = null;
  @Input() responseLabel: string[] = [];
  @Input() isLoading: boolean = false;

  constructor() {}

  onFileChange(event: any): void {
    this.selectedFiles = event.target.files;
  }

  @Output() onUpload: EventEmitter<FileList> = new EventEmitter<FileList>();

  uploadFiles(): void {
    if (this.selectedFiles) {
      if (this.onUpload) {
        this.onUpload.emit(this.selectedFiles);
      }
    } else {
      this.responseLabel = ['Please select files before uploading.'];
    }
  }

  ngOnInit(): void {}
}
