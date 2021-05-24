import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { GetdataService } from '../../services/getdata.service';
import { ComponentStillLoadingError } from '@angular/compiler/src/private_import_core';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})
// implements OnInit
export class DashboardComponent  {
  data: Object;
  weather: Object;
  city: String;
  lat: Number;
  lng: Number;
  country: String;
  population: Number;
  cityLoc: Object;
  cityAQI: [0,0,0,0,0,0,0,0,0,0];


  constructor(
    private getdataservice: GetdataService, 
    private http: Http, 
    private router:Router
  ) { }

  ngOnInit() {
    const TopTen = [
      {id: 1, name:'Tokyo', lat:35.6897, lng:139.6922},
      {id: 2, name:'Mumbai', lat:18.9667, lng:72.8333},
      {id: 3, name:'Melbourne', lat:-37.8136, lng:144.9631},
      {id: 4, name:'Sao Paulo', lat:-23.5504, lng:-46.6339},
      {id: 5, name:'Mexico City', lat:19.4333, lng:-99.1333},
      {id: 6, name:'New York', lat:40.6943, lng:-73.9249},
      {id: 7, name:'Los Angeles', lat:34.1139, lng:-118.4068},
      {id: 8, name:'Paris', lat:48.8566, lng:2.3522},
      {id: 9, name:'London', lat:51.5072, lng:-0.1275},
      {id: 10, name:'Istanbul', lat:41.01, lng:28.9603}   
    ];

/*   this.data = this.getdataservice.getAQI();
  console.log(this.data); */
  let cityAQI = [];
  // Need to pass the coordinates from city data after city informatoin search
  for(var key in TopTen){
      var citydata = TopTen[key];
      console.log(citydata.lat, citydata.lng);
      this.getdataservice.getAQI(citydata).subscribe(weather => {
        if(weather.data.success){
          this.data = weather.data;
          cityAQI.push(weather.data.current.pollution.aqius);    
          console.log(cityAQI);
        }
      // console.log(weather.data.current.pollution.aqius);
      //console.log(weather.data);
      },
      err => {
        console.log(err);
        return false;
      }); 
  }
 
  }
  
  // Works!!
  onSearchSubmit(){
    const cityName = {
      city: this.city
/*       lat: this.lat,
      lng: this.lng,
      country: this.country,
      population: this.population */
    }
    console.log(cityName);
    
      //No work :(

      this.getdataservice.getCityData(cityName).subscribe(cityLoc => {
      //this.city = cityLoc.city;
      console.log(cityLoc);
      
    }); 

  }

}