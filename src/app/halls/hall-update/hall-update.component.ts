import {Component, OnInit} from '@angular/core';
import {HallDto} from "../../dtos/hallDto";
import {ActivatedRoute, Router} from "@angular/router";
import {HallRestService} from "../../services/hall-rest.service";

@Component({
  selector: 'app-hall-update',
  templateUrl: './hall-update.component.html',
  styleUrls: ['./hall-update.component.css']
})
export class HallUpdateComponent implements OnInit{
  hallDto: HallDto ={};
  id: number;

  constructor(private actRoute:ActivatedRoute, private router: Router, private rest: HallRestService) {
  }

  ngOnInit(): void {
    this.id=this.actRoute.snapshot.params['id'];
    this.rest.getOne(this.id).subscribe((response: HallDto)=>{
      this.hallDto=response;
    });
  }


  onUpdate(hallDto: HallDto) {
    this.rest.update(hallDto).subscribe(()=>{
      this.router.navigate(['/halls']);
    });
  }
}
