import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {FestivalRestService} from "../../services/festival-rest.service";
import {FestivalDto} from "../../dtos/festivalDto";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fest-edit',
  templateUrl: './edit-festival.component.html',
  styleUrls: ['./edit-festival.component.css']
})
export class EditFestivalComponent implements OnInit, OnDestroy {

  // id: number=this.actRouter.snapshot.params['id'];
  festId: number;
  fest: FestivalDto = {id: null, name: '', createdAt: null};
  subToFestId: Subscription;
  constructor(
    private router: Router,
    private actRouter: ActivatedRoute,
    private rest: FestivalRestService

  ) {
  }

  ngOnInit(): void {
    this.subToFestId=this.actRouter.params.subscribe(param=>{
      this.festId=param['id'];
      this.getOne();
    })


  }

  public getOne(){
    this.rest.getOne(this.festId).subscribe((res: FestivalDto)=>{
      this.fest=res;
    });
  }

  public onOk(){
    this.rest.update(this.fest).subscribe((res: FestivalDto)=>{
       this.navigateToParent(true);
    });
  }

  navigateToParent(update: boolean){
    this.router.navigate(['festivals'],{queryParams:{update: update}});
  }

  ngOnDestroy(): void {
    this.subToFestId.unsubscribe();
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
  onCancel() {
    this.navigateToParent(false);
  }
}
