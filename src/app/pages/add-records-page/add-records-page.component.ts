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

  onUploadBatch(selectedFiles: FileList): void {
    // Calculate and print the elapsed time
    const startTime = performance.now();
    this.isLoading = true;
    this.responseText = [''];

    const observables = Array.from(selectedFiles).map((file) =>
      this.weatherService.onUploadBatch(file).pipe(
        concatMap((response: ApiResponse) => {
          this.responseText.push(response.message);
          return of(response);
        })
      )
    );
    forkJoin(observables).subscribe((responses: ApiResponse[]) => {
      this.isLoading = false;
      // Your operation here
      // ...

      // Stop measuring time
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log(`Operation took ${elapsedTime} milliseconds.`);
    });
  }

  ngOnInit(): void {
    this.weatherService.setBaseUrl('https://localhost:7090/WeatherForecast');
  }
}
