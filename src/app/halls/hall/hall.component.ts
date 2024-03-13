import {Component, OnDestroy, OnInit} from '@angular/core';
import {HallDto} from "../../dtos/hallDto";
import {HallRestService} from "../../services/hall-rest.service";

import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallComponent implements OnInit, OnDestroy {
  hallDto: HallDto[] = [];
  subToParamUpdate: Subscription;

  constructor(private hallRest: HallRestService, private actRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log("On init");
    this.getHalls();
    this.subToParamUpdate = this.actRoute.queryParamMap.subscribe(param => {
      let p = param.get('update');
      if (p) {
        this.getHalls();
      }
    })
  }

  public getHalls() {
    this.hallRest.getAll().subscribe((response: HallDto[]) => {
      this.hallDto = response;
    });
  }

  onDelete(id: number) {
    this.hallRest.delete(id).subscribe(() => {
      this.getHalls();
    })
  }

  ngOnDestroy(): void {
    this.subToParamUpdate.unsubscribe();
  }
}
