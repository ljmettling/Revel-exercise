import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataRetrieverService {
  url = 'http://api.openweathermap.org/data/2.5/forecast?q=minneapolis,us&units=imperial&APPID=09110e603c1d5c272f94f64305c09436';

  constructor(private http: HttpClient) { }

  getWeatherInfo() {
    return this.http.get<any>(this.url);
  }
}
