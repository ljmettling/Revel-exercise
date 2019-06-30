import { Component, OnInit } from '@angular/core';
import { DataRetrieverService } from '../../services/data-retriever.service';
import { Day } from '../../classes/day';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit {
  dataObj;
  fiveDayObj = [];
  fiveDays = [];
  constructor(private weatherData: DataRetrieverService) { }

  ngOnInit() {
    this.weatherData.getWeatherInfo()
    .subscribe(
      response => {
        const d = response.list;
        // break into day chunks
        while (d.length) {
          this.fiveDayObj.push(d.splice(0, 8));
        }
        // console.log(this.fiveDayObj)
        this.fiveDayObj.forEach(dObj => {
          dObj.splice(0, 2);
          const dayObj = new Day();
          const utcDate = new Date(dObj[0].dt * 1000);
          const dayInt =  utcDate.getUTCDay();
          const dayMonth = utcDate.getMonth();
          dayObj.date = utcDate.getDate();
          // convert dayInt to name
          switch (dayInt) {
            case 0: dayObj.weekday = 'Sunday'; break;
            case 1: dayObj.weekday = 'Monday'; break;
            case 2: dayObj.weekday = 'Tuesday'; break;
            case 3: dayObj.weekday = 'Wednesday'; break;
            case 4: dayObj.weekday = 'Thursday'; break;
            case 5: dayObj.weekday = 'Friday'; break;
            case 6: dayObj.weekday = 'Saturday'; break;
          }
          // convert dayMonth to name
          switch (dayMonth) {
            case 0: dayObj.month = 'January'; break;
            case 1: dayObj.month = 'February'; break;
            case 2: dayObj.month = 'March'; break;
            case 3: dayObj.month = 'April'; break;
            case 4: dayObj.month = 'May'; break;
            case 5: dayObj.month = 'June'; break;
            case 6: dayObj.month = 'July'; break;
            case 7: dayObj.month = 'August'; break;
            case 8: dayObj.month = 'September'; break;
            case 9: dayObj.month = 'October'; break;
            case 10: dayObj.month = 'November'; break;
            case 11: dayObj.month = 'December'; break;

          }
          let avetemp = 0;
          let issunny = 0;
          let israining = 0;
          dObj.forEach(tObj => {
            avetemp = avetemp + tObj.main.temp;
            // console.log(tObj.weather[0].id);

            if (tObj.weather[0].id === 800) {
              issunny = issunny + 1;
            }
            if (tObj.weather[0].id < 800) {
              israining = israining + 1;
            }
          });
          avetemp = avetemp / 6;
          // Average Temp
          // Warm, Moderate or Cool
          if (avetemp > 75) {
            dayObj.contactIcon = 'sms';
            dayObj.contactReason = 'Warm Temps';
            dayObj.contactBlurb = 'It is nice and warm out, your users will want a text message';
          } else if (avetemp >= 55 && avetemp <= 75) {
            dayObj.contactIcon = 'envelope';
            dayObj.contactReason = 'Moderate Temps';
            dayObj.contactBlurb = 'Moderate tempuratures show your users will want an email';
          } else if (avetemp < 55) {
            dayObj.contactIcon = 'phone';
            dayObj.contactReason = 'Cool Temps';
            dayObj.contactBlurb = 'It is chilly out, your users will want a phone call';
          }
          // IF Sunny
          if (issunny >= 3) {
            dayObj.contactIcon = 'sms';
            dayObj.contactReason = 'Sunny';
            dayObj.contactBlurb = 'Sunshine for most of today, your users will want a text message';
          }
          // IF Raining
          if (israining >= 3) {
            dayObj.contactIcon = 'phone';
            dayObj.contactReason = 'Rainy';
            dayObj.contactBlurb = 'It is going to rain most of the day, your users will want a phone call';
          }
          console.log(issunny);
          dayObj.aveTemp = avetemp;
          dayObj.hourBlocks = dObj;
          this.fiveDays.push(dayObj);
          console.log(dayObj);
        });
        this.dataObj = response.list;
        console.log(this.fiveDays);
      }
    );
  }
}
