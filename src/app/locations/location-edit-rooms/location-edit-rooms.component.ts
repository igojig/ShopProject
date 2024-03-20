import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {LocationDto} from "../../dtos/locationDto";
import {LocationRestService} from "../../services/location-rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-location-edit-rooms',
  templateUrl: './location-edit-rooms.component.html',
  styleUrls: ['./location-edit-rooms.component.css']
})
export class LocationEditRoomsComponent implements OnInit, OnDestroy {


  hallId: number
  locationId: number;

  subToLocationId: Subscription;
  subToHallId: Subscription;

  locationDto:LocationDto={id: null, name: '', hallDto: null};

  constructor(private rest: LocationRestService,
              private router: Router,
              private actRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.subToHallId=this.actRoute.parent.params.subscribe(val=>{
      this.hallId=val['id'];
    });

      this.subToLocationId=this.actRoute.params.subscribe(val=>{
        this.locationId=val['id'];
        this.getLocation();
      });
  }

  onAdd() {
      // this.updatedLocationDto.emit(this.locationDto);
    this.rest.updateById(this.locationId, this.locationDto).subscribe(res=>{
      this.navigateToParent(true);
    })
  }

  onCancel(){
   this.navigateToParent(false);

  }
  public navigateToParent(update: boolean){
    this.router.navigate(['/rooms/details', this.hallId],   {   queryParams: { update: update}  });
  }

  public getLocation(){
    this.rest.getById(this.locationId).subscribe((response: LocationDto)=>{
      this.locationDto=response;
    })
  }
  ngOnDestroy(){
    this.subToHallId.unsubscribe();
    this.subToLocationId.unsubscribe();
    console.log("Destroy");
  }
}
