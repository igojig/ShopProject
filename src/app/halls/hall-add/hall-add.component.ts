import {Component, OnInit} from '@angular/core';
import {HallDto} from "../../dtos/hallDto";
import {ActivatedRoute, Router} from "@angular/router";
import {HallRestService} from "../../services/hall-rest.service";
import {HallComponent} from "../hall/hall.component";

@Component({
  selector: 'app-hall-add',
  templateUrl: './hall-add.component.html',
  styleUrls: ['./hall-add.component.css']
})
export class HallAddComponent implements OnInit {
  hall: HallDto = {id: null, name: '', address: '', createdAt: null};


  constructor(private router: Router, private rest: HallRestService, private actRouter: ActivatedRoute) {
  }

  ngOnInit(): void {

  }

  onAdd() {
    this.rest.add(this.hall).subscribe((result: HallDto) => {
      this.navigateToParent(true);
    })
  }

  onCancel() {
    this.navigateToParent(false);
  }

  navigateToParent(update: boolean) {
    this.router.navigate(['halls'], {queryParams: {update: update}})
  }
}
