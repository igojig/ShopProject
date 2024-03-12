import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FestivalDto} from "../festival-component/festival.component";
import {ActivatedRoute, Router} from "@angular/router";
import {FestivalRestService} from "../../services/festival-rest.service";

@Component({
  selector: 'app-fest-edit',
  templateUrl: './edit-festival.component.html',
  styleUrls: ['./edit-festival.component.css']
})
export class EditFestivalComponent implements OnInit{
  id: number=this.actRouter.snapshot.params['id'];

  fest: FestivalDto = {};
  constructor(
    private router: Router,
    private actRouter: ActivatedRoute,
    private rest: FestivalRestService

  ) {
  }

  ngOnInit(): void {
    this.rest.getOne(this.id).subscribe((res: FestivalDto)=>{
      this.fest=res;
    });
  }

  public updateUser(fest: FestivalDto){
    this.rest.update(fest).subscribe((res: FestivalDto)=>{
        this.router.navigate(['/festivals']);
    });
  }

    // @Input()
  // fest: FestivalDto;
    //
    // @Output()
    // editOkEvent: EventEmitter<FestivalDto> = new EventEmitter<FestivalDto>();
    //
    // @Output()
    // editCancelEvent: EventEmitter<any> = new EventEmitter<any>();

  //   onEditOk(){
  //     this.editOkEvent.emit(this.fest);
  //   }
  //
  // onEditCancel() {
  //     this.editCancelEvent.emit();
  // }
}
