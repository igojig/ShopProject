import {Component, OnInit} from '@angular/core';
import {HallDto} from "../../dtos/hallDto";
import {HallRestService} from "../../services/hall-rest.service";

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallComponent implements OnInit{

  hallDto: HallDto[]=[];

  constructor(private hallRest:HallRestService) {
  }
  ngOnInit(): void {
      console.log("On init");
      this.getHalls();
  }

  public getHalls(){
    this.hallRest.getAll().subscribe((response: HallDto[])=>{
      this.hallDto=response;
    });
  }

  onDelete(id: number) {
    this.hallRest.delete(id).subscribe(()=>{
      this.getHalls();
    })
  }
}
