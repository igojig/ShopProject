import {Component, OnDestroy, OnInit} from '@angular/core';
import {HallDto} from "../../dtos/hallDto";
import {ActivatedRoute, Router} from "@angular/router";
import {HallRestService} from "../../services/hall-rest.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hall-update',
  templateUrl: './hall-update.component.html',
  styleUrls: ['./hall-update.component.css']
})
export class HallUpdateComponent implements OnInit, OnDestroy {
  hallDto: HallDto = {};
  hallId: number;
  subToHallId: Subscription;
  constructor(private actRoute:ActivatedRoute, private router: Router, private rest: HallRestService) {
  }

  ngOnInit(): void {
    this.subToHallId=this.actRoute.params.subscribe(param=>{
      this.hallId=param['id'];
      this.rest.getOne(this.hallId).subscribe((response: HallDto)=>{
        this.hallDto=response;
    })
    // this.hallId=this.actRoute.snapshot.params['id'];

    });
  }

  onUpdate() {
    this.rest.update(this.hallDto).subscribe(()=>{
      this.navigateToParent(true);
    });
  }


  onCancel() {
    this.navigateToParent(false);
  }

  navigateToParent(update: boolean){
    this.router.navigate(['halls'], {queryParams:{update: update}});
  }

  ngOnDestroy(): void {
    this.subToHallId.unsubscribe();
  }
}
