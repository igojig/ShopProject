import {Component, OnInit, Output} from '@angular/core';
import {PagesInfo} from "../event-pages/event-pages.component";

@Component({
  selector: 'app-event-container',
  templateUrl: './event-container.component.html',
  styleUrls: ['./event-container.component.css']
})
export class EventContainerComponent implements OnInit{
  // // @Output()
  //
  // currentPage: number;
  // // @Output()
  //
  // recordsPerPage: number;

  constructor() {
  }
  ngOnInit(): void {
    console.log("EventContainer:OnInit");
  }

  // onCurrentPageChange(pagesInfo: PagesInfo) {
  //   this.currentPage=pagesInfo.currentPage;
  //   this.recordsPerPage=pagesInfo.recordsPerPage;
  //
  // }
}
