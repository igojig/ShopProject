import { Component } from '@angular/core';
import {HallDto} from "../../dtos/hallDto";
import {Router} from "@angular/router";
import {HallRestService} from "../../services/hall-rest.service";
import {HallComponent} from "../hall/hall.component";

@Component({
  selector: 'app-hall-add',
  templateUrl: './hall-add.component.html',
  styleUrls: ['./hall-add.component.css']
})
export class HallAddComponent {

  hall: HallDto ={};

  constructor(private router: Router, private rest: HallRestService) {
  }

  onAdd(hall: HallDto){
    this.rest.add(hall).subscribe((result: HallDto)=>{
      this.router.navigate(['/halls'])
    })
  }

}
