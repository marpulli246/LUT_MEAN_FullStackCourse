import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { GetdataService } from '../../services/getdata.service';
import {FlashMessagesService} from 'angular2-flash-messages';

/* import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../map.service';
import { GeoJson, FeatureCollection } from '../../map'; */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})
// implements OnInit
export class DashboardComponent  {
  data: Object;
  weather: Object;
  city: Object; //String
 /*  lat: Number;
  lng: Number;  */
  country: String;
  population: Number;
  cityLoc: Object;
  TopTen: Object;
  cityName: Object;
  scity: Object;

  constructor(
    private getdataservice: GetdataService, 
    private http: Http, 
    private router: Router,
    private flashMessage:FlashMessagesService

  
  ) { 
    this.TopTen = [
      {id: 1, name:'Tokyo', lat:35.6897, lng:139.6922, AQI:0},
      {id: 2, name:'Mumbai', lat:18.9667, lng:72.8333, AQI:0},
      {id: 3, name:'Melbourne', lat:-37.8136, lng:144.9631, AQI:0},
      {id: 4, name:'Sao Paulo', lat:-23.5504, lng:-46.6339, AQI:0},
      {id: 5, name:'Mexico City', lat:19.4333, lng:-99.1333, AQI:0},
      {id: 6, name:'New York', lat:40.6943, lng:-73.9249, AQI:0},
      {id: 7, name:'Los Angeles', lat:34.1139, lng:-118.4068, AQI:0},
      {id: 8, name:'Paris', lat:48.8566, lng:2.3522, AQI:0},
      {id: 9, name:'London', lat:51.5072, lng:-0.1275, AQI:0},
      {id: 10, name:'Istanbul', lat:41.01, lng:28.9603, AQI:0} 
    ];
  }

  ngOnInit() {

   //let cityAQI = [];
   let i=0;
 
   for(var key in this.TopTen) {
      var citydata = this.TopTen[key];
      this.getdataservice.getAQI(citydata).subscribe(weather => {
          this.data = weather.data;
          this.TopTen[i].AQI = (weather.data.current.pollution.aqius);
          i++;          
      });
 
   }
  }
 
  onSearchSubmit(){
    const cityName = {
      city: this.city
    }
   
    this.getdataservice.getCityData(cityName).subscribe(cityLoc => {      
      this.scity = cityLoc.city;
      const cshare = cityLoc.population / cityLoc.coPopulation;     

    console.log(cityLoc);
    this.getdataservice.getAQI(cityLoc.city).subscribe(weather => {
        this.data = weather.data;
    })
   });     
  }

}       



