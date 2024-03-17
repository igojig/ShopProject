import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventDto} from "../dtos/eventDto";

@Injectable({
  providedIn: 'root'
})
export class EventRestService {

  private baseUrl = 'http://localhost:8000/api/events'

  // /events/festivals/{festId}/rooms/{roomId}"

  constructor(private http: HttpClient) {

  }

  public getAll() {
    return this.http.get<EventDto[]>(this.baseUrl);
  }

  public getById(id: number){
    console.log("Event rest:" +id);
    return this.http.get<EventDto>(`${this.baseUrl}/${id}`);
  }

  public post(eventDto: EventDto) {
    return this.http.post(`${this.baseUrl}`, eventDto);
  }

  public put(id: number, event: EventDto){
    return this.http.put<EventDto>(this.baseUrl +'/' + id, event);
  }

  public deleteById(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
