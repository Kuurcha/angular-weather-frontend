import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, finalize, forkJoin, of, zip } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { ApiResponse } from '../../models/api-excel-response';

@Component({
  selector: 'app-add-records-page',
  templateUrl: './add-records-page.component.html',
  styleUrls: ['./add-records-page.component.scss'],
})
export class AddRecordsPageComponent implements OnInit {
  public responseText: string[] = [''];
  public isLoading: boolean = false;
  constructor(private weatherService: WeatherService) {}

  onUpload(selectedFiles: FileList): void {
    this.isLoading = true;
    this.responseText = [''];

    const observables = Array.from(selectedFiles).map((file) =>
      this.weatherService.onUpload(file).pipe(
        concatMap((response: ApiResponse) => {
          this.responseText.push(response.message);
          return of(response);
        })
      )
    );
    forkJoin(observables).subscribe((responses: ApiResponse[]) => {
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.weatherService.setBaseUrl('https://localhost:7090/WeatherForecast');
  }
}
