import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class GetdataService {
  citydata: any;
  cityName: any;
  authToken: any;

  constructor(private http:Http) { }
 
  getAQI(citydata) {

  var lat = citydata.lat; 
  var lng = citydata.lng;
  var api ='http://api.airvisual.com/v2/nearest_city?lat='
  var api2 = '&lon='
  var apiKey = '&key=a9cccd06-2db2-400b-bf14-68f967fa2440'

  var url = api + lat + api2 + lng + apiKey;
    return this.http.get(url)
    .map(res => res.json()); 
      
  }
  
  
  getCityData(cityName){
    //console.log(cityName);
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('city', cityName.city);
    headers.append('Content-Type','application/json');
    //console.log(headers);
    return this.http.get('http://localhost:3000/users/dashboard',{headers:headers})
    .map(res => res.json());
    
  } 


  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }



}

 
