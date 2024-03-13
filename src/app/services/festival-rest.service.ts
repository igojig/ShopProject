import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FestivalDto} from "../dtos/festivalDto";


@Injectable({
  providedIn: 'root'
})
export class FestivalRestService {

  private baseUrl: string = 'http://localhost:8000/api/festivals'

  constructor(private http: HttpClient) {
  }

  public getAll(){
    return this.http.get<FestivalDto[]>(this.baseUrl);
  }

  public getOne(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  public add(fest: FestivalDto){
    return this.http.post<FestivalDto>(this.baseUrl, fest);
  }

  public update(fest: FestivalDto){
    return this.http.put<FestivalDto>(this.baseUrl+ '/' +fest.id, fest);
  }

  public delete(id: number){
    return this.http.delete<FestivalDto>(`${this.baseUrl}/${id}`);
  }
}
