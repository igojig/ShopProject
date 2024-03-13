import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {HallDto} from "../dtos/hallDto";

@Injectable({
  providedIn: 'root'
})
export class HallRestService {

  private baseUrl: string = 'http://localhost:8000/api/halls'

  constructor(private http: HttpClient) {
  }

  public getAll(){
    return this.http.get<HallDto[]>(this.baseUrl);
  }

  public getOne(id: number){
    return this.http.get<HallDto>(`${this.baseUrl}/${id}`);
  }

  public add(hall: HallDto){
    return this.http.post<HallDto>(this.baseUrl, hall);
  }

  public update(hall: HallDto){
    return this.http.put<HallDto>(this.baseUrl+ '/' +hall.id, hall);
  }

  public delete(id: number){
    return this.http.delete<HallDto>(`${this.baseUrl}/${id}`);
  }
}
