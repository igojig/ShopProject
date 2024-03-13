import {Component, EventEmitter, Output} from '@angular/core';

import {Router} from "@angular/router";
import {FestivalRestService} from "../../services/festival-rest.service";
import {FestivalDto} from "../../dtos/festivalDto";
import {jsDocComment} from "@angular/compiler";

@Component({
  selector: 'app-add-festival',
  templateUrl: './add-festival.component.html',
  styleUrls: ['./add-festival.component.css']
})
export class AddFestivalComponent {

  // festivalName: string='';
  fest: FestivalDto = {id: null, name: '', createdAt: null};

  constructor(private router: Router, private rest: FestivalRestService) {
  }

  // @Output()
  // addOkEvent: EventEmitter<string> = new EventEmitter<string>();
  //
  // @Output()
  // addCancelEvent: EventEmitter<any> = new EventEmitter<any>();

  onAdd() {
    console.log(this.fest);
    this.rest.add(this.fest).subscribe((data: {}) => {
      this.navigateToParent(true);
    })
  }

  onCancel() {
      this.navigateToParent(false);
  }

  navigateToParent(update: boolean){
      this.router.navigate(['festivals'], {queryParams:{update: update}});
  }
  //
  // onCancel() {
  //     this.addCancelEvent.emit();


  // }
}
