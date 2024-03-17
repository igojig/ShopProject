import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LocationRestService} from "../../services/location-rest.service";
import {LocationDto} from "../../dtos/locationDto";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-location-rooms',
  templateUrl: './location-rooms.component.html',
  styleUrls: ['./location-rooms.component.css']
})
export class LocationRoomsComponent implements OnInit , OnDestroy{
  locationDtos: LocationDto[] = [];

  hallId: number;

  subToHallId: Subscription;
  subToParam: Subscription;

  constructor(
    private restLocation: LocationRestService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {

  }


  ngOnInit(): void {

    this.subToHallId=this.actRoute.params.subscribe(param=>{
      this.hallId=param['id'];
      console.log("Path variabele" +this.hallId);
      this.getRoomsByHallId();

      this.subToParam=this.actRoute.queryParamMap.subscribe(params=>{
        let p = params.get('update');
        console.log("Paramentr"+p);
        if(p=='true'){
          this.getRoomsByHallId();
        }
      });

    });

  }

  onDelete(id: number) {
    this.restLocation.deleteById(id).subscribe(() => {
      this.getRoomsByHallId();
    })
  }

  public getRoomsByHallId() {
    this.restLocation.getByHallId(this.hallId).subscribe((response: LocationDto[]) => {
      this.locationDtos = response;
    })
  }


  ngOnDestroy(): void {
    this.subToHallId.unsubscribe();
  }
}
