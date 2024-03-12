import {Component, OnInit} from '@angular/core';
import {HallRestService} from "../../services/hall-rest.service";
import {LocationRestService} from "../../services/location-rest.service";
import {HallDto} from "../../dtos/hallDto";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit{

  hallDto: HallDto[]=[];
  selectedHallId: number=-1;
  length: number



  constructor(
    private hallRest:HallRestService,
    private locationRest: LocationRestService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    console.log(this.hallDto);
    this.hallRest.getAll().subscribe((response: HallDto[])=>{
      this.hallDto=response;
      this.length=response.length;
    });
  }

  // onSelect(id: number) {
  //   console.log(id);
  //   console.log(this.selectedHallId);
  // }
  onModelChange() {
    console.log("Model change: "+this.selectedHallId);
    this.router.navigate(['details', this.selectedHallId],  { relativeTo: this.actRoute })
  }
}
