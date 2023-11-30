import { WeatherRecordDetails } from './weather-record-details';

export class WeatherRecord {
  id: number = 0;
  date: Date = new Date();
  temperature: string = '';
  humidity?: number;
  dewPoint?: number;
  pressure?: number;
  windDirection?: string;
  windSpeed?: number;
  cloudiness?: number;
  cloudBase?: number;
  visibility?: number;
  weatherRecordDetails?: WeatherRecordDetails = undefined;
}
