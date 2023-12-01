import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  DateRange,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  totalItems: number = 0;
  currentPage: number = 0;
  pageSize: number[] = [10];
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
  columnTemplate!: TemplateRef<any>;

  selectedDate: Date;
  minDate: Date;
  maxDate: Date;

  constructor(
    private weatherService: WeatherService,
    private datePipe: DatePipe
  ) {
    this.selectedDate = new Date();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngAfterViewInit() {
    this.weatherRecords.paginator = this.paginator;
    this.weatherRecords.sort = this.sort;
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  getLatestId(): number {
    const data = this.weatherRecords.data;
    if (data.length > 0) {
      const latestRecord = data.reduce((maxRecord, currentRecord) =>
        currentRecord.id > maxRecord.id ? currentRecord : maxRecord
      );
      return latestRecord.id;
    }
    return -1;
  }

  private handleApiResponse(response: ApiResponse): void {
    if (response.content) {
      const newData: WeatherRecord[] = response.content;
      this.weatherRecords.data = [...this.weatherRecords.data, ...newData];
      this.setTotalItems().subscribe();
    }
  }
  setTableRecords(): void {
    const lastId = this.getLatestId();
    if (this.range.valid && this.range.value.start && this.range.value.end) {
      this.weatherService
        .getWeatherRecordsInDateRange(
          lastId,
          this.pageSize[0] * 10,
          this.range.value.start,
          this.range.value.end
        )
        .subscribe((response: ApiResponse) => {
          this.handleApiResponse(response);
        });
    } else {
      this.weatherService
        .getWeatherDetailsById(lastId, this.pageSize[0] * 10)
        .subscribe((response: ApiResponse) => {
          this.handleApiResponse(response);
        });
    }
  }
  setTotalItems(): Observable<ApiResponse> {
    let totalRecordsObservable: Observable<ApiResponse>;

    if (this.range.valid && this.range.value.start && this.range.value.end) {
      const startDate = this.range.value.start;
      const endDate = this.range.value.end;
      totalRecordsObservable =
        this.weatherService.getTotalWeatherRecordsWithinRange(
          startDate,
          endDate
        );
    } else {
      totalRecordsObservable = this.weatherService.getTotalWeatherRecords();
    }

    return totalRecordsObservable.pipe(
      tap((response: ApiResponse) => {
        if (response.content) {
          this.paginator.length = response.content;
        }
      })
    );
  }

  onDateRangeChange(event: MatDatepickerInputEvent<any, DateRange<any>>) {
    this.weatherRecords.data = [];
    this.totalItems = 0;
    this.setTableRecords();
    this.setTotalItems();
  }

  ngOnInit(): void {
    this.weatherService.setBaseUrl('https://localhost:7090/WeatherForecast');
    // this.weatherRecords.data = this.weatherService.generateMockData();
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
