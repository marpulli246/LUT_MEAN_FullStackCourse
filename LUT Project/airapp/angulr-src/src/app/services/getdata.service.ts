import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { CompileAnimationStyleMetadata } from '@angular/compiler';

@Injectable()
export class GetdataService {
  citydata: any;
  cityName: any;
  authToken: any;

  constructor(private http:Http) { }
 
  getAQI(citydata) {
/*     return this.http.get('http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key=a9cccd06-2db2-400b-bf14-68f967fa2440')
    .map(res => res.json());  */
  var lat = citydata.lat; 
  var lng = citydata.lng;
  var api ='http://api.airvisual.com/v2/nearest_city?lat='
  var api2 = '&lon='
  var apiKey = '&key=a9cccd06-2db2-400b-bf14-68f967fa2440'

  var url = api + lat + api2 + lng + apiKey;
    return this.http.get(url)
    .map(res => res.json()); 
      
  }
  
/*    getCityData(){
    let headers = new Headers();
    headers.append('Content-Type','application/json'); 
    return this.http.get('http://localhost:3000/users/dashboard')
      .map(res => res.json());
  }  */
  
 
  
  getCityData(cityName){
  console.log(cityName);
  let headers = new Headers();
  let params = new URLSearchParams();
  params.append("city", "London");
  //this.loadToken();
  //headers.append('Authorization', this.authToken);
  headers.append('Content-Type','application/json');
  console.log(headers);
  console.log(params);
  return this.http.get('http://localhost:3000/users/dashboard',{ headers:headers, search: params})
  .map(res => res.json()); 
    

 /*  return City.findOne({'city': cityName}, 'lat lng population', function(err, cityData) {
      // if (err) return handleError(err);
      console.log(cityData.lat, cityData.lng, cityData.population); 
  }); */
  } 

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}


