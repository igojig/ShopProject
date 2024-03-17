import {Component, OnInit} from '@angular/core';
import {EventDto} from "../../dtos/eventDto";
import {EventRestService} from "../../services/event-rest.service";
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  eventDto: EventDto[] = [];
  subToUpdate: Subscription;
  constructor(
    private restLEventService: EventRestService,
    private actRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.subToUpdate=this.actRoute.queryParams.subscribe(param=>{
      let p=param['update'];
      if(p==null || p=='true'){
        this.getEvents();
      }
    })


  }

  private getEvents(){
    this.restLEventService.getAll().subscribe(res =>{
      this.eventDto=res;
      console.log(this.eventDto);
    })
  }


  onDelete(id: number) {
    this.restLEventService.deleteById(id).subscribe(()=>{
      this.getEvents();
    })
  }
}
