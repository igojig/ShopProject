import {Component, EventEmitter, Output} from '@angular/core';
import {FestivalDto} from "../festival-component/festival.component";
import {Router} from "@angular/router";
import {FestivalRestService} from "../../services/festival-rest.service";

@Component({
  selector: 'app-add-festival',
  templateUrl: './add-festival.component.html',
  styleUrls: ['./add-festival.component.css']
})
export class AddFestivalComponent {

    // festivalName: string='';
    fest: FestivalDto={};

    constructor(private router:Router, private rest:FestivalRestService) {
    }

    // @Output()
    // addOkEvent: EventEmitter<string> = new EventEmitter<string>();
    //
    // @Output()
    // addCancelEvent: EventEmitter<any> = new EventEmitter<any>();

  onAdd(fest: FestivalDto) {
    this.rest.add(fest).subscribe((data: {}) => {
      this.router.navigate(['/festivals']);
    })
  }
  //
  // onCancel() {
  //     this.addCancelEvent.emit();
  // }


}
