import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {FestivalDto} from "../../dtos/festivalDto";
import {FestivalRestService} from "../../services/festival-rest.service";
import {HallRestService} from "../../services/hall-rest.service";
import {HallDto} from "../../dtos/hallDto";
import {LocationRestService} from "../../services/location-rest.service";
import {LocationDto} from "../../dtos/locationDto";
import {EventRestService} from "../../services/event-rest.service";
import {EventDto} from "../../dtos/eventDto";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

// interface FormEvent{
//   id: number,
//   festId: number,
//   hallId: number,
//   roomId: number,
//   startDate: Date,
//   name: string
// }

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  festivalDtos: FestivalDto[] = [];
  // selectedFestId: number;

  hallDtos: HallDto[] = [];
  selectedHallId: number;

  locationDtos: LocationDto[] = [];
  selectedLocationId: number

  // startDate: Date;

  // eventName: string;

  eventDto: EventDto = new EventDto();

  // formEventData: FormEvent={id: null, name:'', festId: null, hallId:null, roomId: null, startDate: null};

  @ViewChild('eventForm')
  eventForm: NgForm;

  constructor(
    private festRest: FestivalRestService,
    private hallRest: HallRestService,
    private locationRest: LocationRestService,
    private eventRest: EventRestService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.festRest.getAll().subscribe(resp => {
      this.festivalDtos = resp;
      // this.formEventData.festId=35
    });

    this.hallRest.getAll().subscribe(resp => {
      this.hallDtos = resp;
    });


  }

  onFestivalChange(ev: any) {
    // console.log(this.selectedFestId);
    console.log(ev);
    this.eventDto.festivalDto = this.festivalDtos.find(f => f.id == ev);
  }

  onHallChange(param: number) {
    console.log(param);
    this.locationRest.getByHallId(param).subscribe(resp => {
      this.locationDtos = resp;
      this.eventForm.controls['roomId'].setValue(null);
      // this.formEventData.roomId=null;
    })
  }

  onLocationChange(param: number) {
    console.log(this.locationDtos);
    this.eventDto.roomDto = this.locationDtos.find(l => l.id == param);
  }

  onDateChange() {
    // console.log(this.startDate);
  }

  onAdd(eventFormData: NgForm) {
    console.log(this.eventForm.value);

    // this.eventDto={id: null, name: this.formEventData.name, startDate: this.formEventData.startDate, roomDto: null, festivalDto: null};

    eventFormData.controls

    this.eventDto.name = this.eventForm.controls['name'].value
    this.eventDto.startDate = this.eventForm.controls['startDate'].value

    console.log("Post: " + this.eventDto);

    this.eventRest.post(this.eventDto).subscribe(res => {
      this.navigateToParent(true);
    })
  }

  onSubmit(eventForm: NgForm) {

  }

  navigateToParent(update: boolean) {
    this.router.navigate(['events'], {queryParams: {update: update}});
  }

  onCancel() {
    this.navigateToParent(false);
  }
}
