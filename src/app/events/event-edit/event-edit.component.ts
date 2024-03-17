import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventDto} from "../../dtos/eventDto";
import {EventRestService} from "../../services/event-rest.service";
import {Subscription} from 'rxjs';
import {FestivalRestService} from "../../services/festival-rest.service";
import {FestivalDto} from "../../dtos/festivalDto";
import {HallDto} from "../../dtos/hallDto";
import {HallRestService} from "../../services/hall-rest.service";
import {LocationRestService} from "../../services/location-rest.service";
import {LocationDto} from "../../dtos/locationDto";
import {NgForm} from "@angular/forms";


// interface FormEvent {
//   id: number,
//   festId: number,
//   hallId: number,
//   roomId: number,
//   startDate: Date,
//   name: string
// }

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit, OnDestroy {

  subToEventId: Subscription;
  eventId: number;
  eventDto: EventDto = new EventDto();
  hallDto: HallDto[] = [];

  // formEventData: FormEvent = {id: null, name: '', festId: null, hallId: null, roomId: null, startDate: null};
  festivalDto: FestivalDto[] = [];
  locationDto: LocationDto[] = [];

  @ViewChild('eventForm')
  eventForm: NgForm;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private eventRestService: EventRestService,
    private festRest: FestivalRestService,
    private hallRest: HallRestService,
    private locationRest: LocationRestService
  ) {
  }

  ngOnInit(): void {
    this.subToEventId = this.actRoute.params.subscribe(param => {
      if(this.eventForm){
        console.log("reset")
        this.eventForm.controls['hallId'].markAsPristine()// .reset( null, { onlySelf: true, emitEvent: false } );
        this.eventForm.controls['hallId'].markAsUntouched()// .reset( null, { onlySelf: true, emitEvent: false } );
      }
      this.eventId = param['id'];
      console.log(this.eventId);
      this.getEvent();
      console.log("OnInit" + this.eventDto);


      // this.getFestivals();
    });

  }

  getEvent() {
    console.log("GetEvent" + this.eventId);
    this.eventRestService.getById(this.eventId).subscribe((resp: EventDto) => {
      this.eventDto = resp;
      console.log("GetEvent" + this.eventDto);
      this.getFestivals();
      this.getHalls();
      this.getLocationsById(this.eventDto.roomDto.hallDto.id);

      this.eventForm.controls['startDate'].setValue(this.eventDto.startDate);
      this.eventForm.controls['name'].setValue(this.eventDto.name);

      // this.formEventData.startDate = this.eventDto.startDate;
      // this.formEventData.name = this.eventDto.name;
    })
  }

  getFestivals() {
    this.festRest.getAll().subscribe(resp => {
      this.festivalDto = resp;
      console.log(resp);
      // this.formEventData.festId = this.eventDto.festivalDto.id;
      this.eventForm.controls['festId'].setValue(this.eventDto.festivalDto.id);
      console.log("Fest id:" + this.eventDto.festivalDto.id);
    })
  }

  getHalls() {
    this.hallRest.getAll().subscribe(resp => {
      this.hallDto = resp;
      // this.formEventData.hallId = this.eventDto.roomDto.hallDto.id;
      this.eventForm.controls['hallId'].setValue(this.eventDto.roomDto.hallDto.id);

    })
  }

  getLocationsById(id: number) {
    console.log(id);
    this.locationRest.getByHallId(id).subscribe(resp => {
      this.locationDto = resp;
      // this.formEventData.roomId = this.eventDto.roomDto.id;
      this.eventForm.controls['roomId'].setValue( this.eventDto.roomDto.id);
    })
  }

  onFestivalChange(param: any) {
    this.eventDto.festivalDto = this.festivalDto.find(p => {
      return p.id == param;
    });
    console.log(this.eventDto);
  }


  ngOnDestroy(): void {
    this.subToEventId.unsubscribe();
  }

  onLocationChange(param: number) {
    console.log("location change");
    this.eventDto.roomDto = this.locationDto.find(l => {
      return l.id == param;
    });


  }

  onHallChange(param: number) {
    console.log("hall change")
    console.log(param);

    this.locationRest.getByHallId(param).subscribe(resp => {
      this.locationDto = resp;

      if(this.eventForm.controls['hallId'].dirty){
        this.eventForm.controls['roomId'].setValue(null);
      }

    })
  }

  onUpdate(eventForm: NgForm) {


    // let event: EventDto = {id: this.eventDto.id, startDate: this.formEventData.startDate, name:this.formEventData.name, roomDto: null, festivalDto: null};
    // this.eventDto.name = this.formEventData.name;
    this.eventDto.name = this.eventForm.controls['name'].value;
    this.eventDto.startDate = this.eventForm.controls['startDate'].value;

    console.log("Update Event:" + this.eventDto)

    this.eventRestService.put(this.eventDto.id, this.eventDto).subscribe(() => {
      this.navigateToParent(true);
    })
  }

  onCancel() {
    this.navigateToParent(false);
  }

  public navigateToParent(update: boolean) {
    this.router.navigate(['events'], {queryParams: {update: update}});
  }
}
