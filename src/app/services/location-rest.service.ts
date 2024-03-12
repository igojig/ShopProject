import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocationDto} from "../dtos/locationDto";

@Injectable({
  providedIn: 'root'
})
export class LocationRestService {

 private baseUrl: string="http://localhost:8000/api"

  constructor(private http:HttpClient) { }


  public getByHallId(id: number){
   return this.http.get(this.baseUrl + '/halls/' + id + '/rooms');
  }

  public deleteById(id: number){
   return this.http.delete(this.baseUrl + '/rooms/' + id);
  }

  public addByHallId(id: number, locationDto: LocationDto){
   return this.http.post(this.baseUrl + '/halls/' + id + '/rooms', locationDto);
  }

  public updateById(id: number, locationDto:LocationDto){
   return this.http.put(this.baseUrl + '/rooms/' + id, locationDto);
  }

  public getById(id: number){
   return this.http.get(this.baseUrl + '/rooms/' +id);
  }
}
