import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../models/weather.service';
import { SampleService } from '../services/sample.service';
import { ApiResponse } from '../models/api-excel-response';

@Component({
  selector: 'app-add-records-page',
  templateUrl: './add-records-page.component.html',
  styleUrls: ['./add-records-page.component.scss'],
})
export class AddRecordsPageComponent implements OnInit {
  public responseText: string = '';
  constructor(private weatherService: WeatherService) {}

  onUpload(selectedFiles: FileList): void {
    this.weatherService
      .onUpload(selectedFiles)
      .subscribe((response: ApiResponse) => {
        this.responseText = response.message;
        console.log(this.responseText);
      });
  }

  ngOnInit(): void {
    this.weatherService.setBaseUrl('https://localhost:7090/WeatherForecast');
  }
}
