import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-excel-response';
import { WeatherRecord } from 'src/app/models/weather-record';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-browse-record-page',
  templateUrl: './browse-record-page.component.html',
  styleUrls: ['./browse-record-page.component.scss'],
})
export class BrowseRecordPageComponent implements OnInit {
  weatherRecords: MatTableDataSource<WeatherRecord> =
    new MatTableDataSource<WeatherRecord>();
  columns = [
    { field: 'date', header: 'Date' },
    { field: 'temperature', header: 'Temperature' },
    { field: 'humidity', header: 'Humidity' },
    { field: 'dewPoint', header: 'Dew Point' },
    { field: 'pressure', header: 'Pressure' },
    { field: 'windDirection', header: 'Wind Direction' },
    { field: 'windSpeed', header: 'Wind Speed' },
    { field: 'cloudiness', header: 'Cloudiness' },
    { field: 'cloudBase', header: 'Cloud Base' },
    { field: 'visibility', header: 'Visibility' },
    { field: 'weatherRecordDetails', header: 'Details' },
  ];
  displayedColumns: string[] = this.columns.map((column) => column.field);

  totalItems: number = 0;
  currentPage: number = 0;
  pageSize: number[] = [10];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnTemplate!: TemplateRef<any>;

  ngAfterViewInit() {
    this.weatherRecords.paginator = this.paginator;
    this.weatherRecords.sort = this.sort;
  }
  constructor(
    private weatherService: WeatherService,
    private datePipe: DatePipe
  ) {}

  setTableRecords(): void {
    this.weatherService
      .getWeatherDetails(
        this.pageSize[0] * this.currentPage,
        this.pageSize[0] * 10
      )
      .subscribe((response: ApiResponse) => {
        if (response.content) {
          const newData: WeatherRecord[] = response.content;
          this.weatherRecords.data = [...this.weatherRecords.data, ...newData];

          this.setTotalItems().subscribe();
        }
      });
  }

  setTotalItems(): Observable<ApiResponse> {
    return this.weatherService.getTotalWeatherRecords().pipe(
      tap((response: ApiResponse) => {
        if (response.content) {
          this.paginator.length = response.content;
        }
      })
    );
  }

  ngOnInit(): void {
    this.weatherService.setBaseUrl('https://localhost:7090/WeatherForecast');
    this.setTableRecords();
    this.setTotalItems();
  }

  hasDataForPage(page: number): boolean {
    const startIndex = page * this.pageSize[0];
    const endIndex = startIndex + this.pageSize[0];

    return (
      this.weatherRecords.data.length > 0 &&
      startIndex >= 0 &&
      endIndex <= this.weatherRecords.data.length
    );
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    if (!this.hasDataForPage(this.paginator.pageIndex)) {
      this.setTableRecords();
    } else {
    }

    this.setTotalItems();
  }

  getColumnValue(row: WeatherRecord, field: string): any {
    if (field === 'weatherRecordDetails') {
      return row.weatherRecordDetails
        ? row.weatherRecordDetails.description
        : '';
    }
    if (field === 'date') {
      return this.datePipe.transform(row.date, 'yyyy-MM-dd \n HH:mm:ss');
    }
    return row[field as keyof WeatherRecord];
  }
}
