import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LocationDto} from "../../dtos/locationDto";
import {ActivatedRoute, Router} from "@angular/router";
import { Subscription } from 'rxjs';
import {LocationRestService} from "../../services/location-rest.service";
import {HallDto} from "../../dtos/hallDto";
import {HallRestService} from "../../services/hall-rest.service";

@Component({
  selector: 'app-location-add-rooms',
  templateUrl: './location-add-rooms.component.html',
  styleUrls: ['./location-add-rooms.component.css']
})
export class LocationAddRoomsComponent implements OnInit, OnDestroy {

  // @Output()

  // newLocationDtoOk: EventEmitter<LocationDto> = new EventEmitter<LocationDto>();
  hallId: number;
  locationDto: LocationDto = {id: null, name: '', hallDto:null};
  subToHallId: Subscription;
  hallDto: HallDto;

  constructor(private actRoute:ActivatedRoute,
              private rest: LocationRestService,
              private router: Router,
              private hallRestService: HallRestService
  ) {
  }

  ngOnInit(): void {
      this.subToHallId=this.actRoute.parent.params.subscribe(param =>{
        this.hallId=param['id'];
        this.getHall();
      })
  }


  onAdd() {
    // this.newLocationDtoOk.emit(this.locationDto);
    this.rest.addByHallId(this.hallId, this.locationDto).subscribe(response=>{
        this.navigateToParent(true);
    });
  }

  onCancel() {
    // this.locationDto=null;
    // this.newLocationDtoOk.emit(this.locationDto);
    this.navigateToParent(false);
  }

  getHall(){
    this.hallRestService.getOne(this.hallId).subscribe(resp=>{
      this.hallDto=resp;
      this.locationDto.hallDto=this.hallDto;
    })
  }

  navigateToParent(update: boolean){
    this.router.navigate(['../../', this.hallId],   {   queryParams: { update: update} ,relativeTo: this.actRoute });
  }

  ngOnDestroy(): void {
    this.subToHallId.unsubscribe();
  }
}
