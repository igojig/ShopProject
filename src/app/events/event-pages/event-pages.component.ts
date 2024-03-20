import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EventRestService} from "../../services/event-rest.service";
import {PageInfoService} from "../../services/page-info.service";




export interface PagesInfo{
    currentPage: number,
    recordsPerPage: number
}


@Component({
  selector: 'app-event-pages',
  templateUrl: './event-pages.component.html',
  styleUrls: ['./event-pages.component.css']
})
export class EventPagesComponent implements OnInit, AfterViewInit{
  pagesArrayForSelect: number[]=[5, 10, 15];
  totalRecords: number=-1;
  recordsPerPage: number=5;

  currentPage: number=0;
  pages: number[]=[];

  // @Output()
  // pageChange: EventEmitter<PagesInfo>=new EventEmitter<PagesInfo>();

  constructor(
    private eventRest: EventRestService,
    private pageInfoService: PageInfoService
  ) {
  }

  ngOnInit(): void {
    console.log("EventPages:OnInit")
    this.pageInfoService.changeMessage({currentPage: this.currentPage, recordsPerPage:this.recordsPerPage});
    // this.onRecordsPerPageChange(this.recordsPerPage);
    this.getEventsCount();
    // this.calculatePages();
  }

  ngAfterViewInit(): void {
    console.log("EventPages:AfterViewInit");
  }

  onRecordsPerPageChange(param: any) {
    console.log("EventPage:OnRecordsChange" + param);

    // this.pageChange.emit({currentPage: this.currentPage, recordsPerPage: this.recordsPerPage});
    // this.getEventsCount();
    this.calculatePages();

    this.pageInfoService.changeMessage({currentPage: this.currentPage, recordsPerPage:this.recordsPerPage});
  }

  private calculatePages(){
    let pagesCount=Math.ceil(this.totalRecords/this.recordsPerPage);
    if(this.currentPage>=pagesCount){
      this.currentPage=pagesCount-1;
    }
    console.log("EventPage: Calculate Pages: "+pagesCount);
    this.pages=[];
    for(let i=0;i<pagesCount;i++){
      this.pages.push(i);
    }
    console.log(this.pages);
  }

  onChangeCurrentPage(i: number) {

    this.currentPage=i;
    console.log(i);
    // this.getEventsCount();
    this.calculatePages();
    // this.pageChange.emit({currentPage: this.currentPage, recordsPerPage: this.recordsPerPage});
    this.pageInfoService.changeMessage({currentPage: this.currentPage, recordsPerPage:this.recordsPerPage});
  }

  public getEventsCount(){
    this.eventRest.getCount().subscribe(response=>{
      console.log("Events count:" + response);
      this.totalRecords=response;
      this.calculatePages();
    });
  }
}
