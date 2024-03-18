import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {EventDto, PagableEventDto} from "../../dtos/eventDto";
import {EventRestService} from "../../services/event-rest.service";
import {ActivatedRoute} from "@angular/router";
import {combineLatest, Subscription} from 'rxjs';
import {EventPagesComponent} from "../event-pages/event-pages.component";
import {PageInfoService} from "../../services/page-info.service";


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  // eventDto: EventDto[] = [];
  eventDto: PagableEventDto;
  // subToUpdate: Subscription;
  // subToPageInfo: Subscription;
  sub: Subscription;

  // @ViewChild(EventPagesComponent)
  // er: EventPagesComponent

  // subToPageParams: Subscription;
  // @Input()
  pageNo: number;
  // @Input()
  recordsPerPage: number

  constructor(
    private restLEventService: EventRestService,
    private actRoute: ActivatedRoute,
    private pageInfoService: PageInfoService
  ) {
  }

  ngAfterViewInit(): void {
    console.log("EventList: After View Init");
    console.log("EventList:After View Init: Page No" + this.pageNo);
    console.log("EventList:After View Init: Records Per Page" + this.recordsPerPage);

    // this.getEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //   for (let property in changes){
    //     if(property==='pageNo'){
    //       console.log("EventList:Onchange:Page change: "+changes[property].currentValue);
    //       this.getEvents();
    //     }
    //     if(property==='recordsPerPage'){
    //       console.log("EventList:Onchange:Records Per Page change" + changes[property].currentValue);
    //       this.getEvents()
    //     }
    //     console.log("EventList:Onchange: Page No" +this.pageNo);
    //     console.log("EventList:OnChange: Records Per Page" + this.recordsPerPage);
    //   }
  }

  ngOnInit(): void {
    console.log("EventList: On Init: page no" + this.pageNo);

    this.sub = combineLatest(this.pageInfoService.currentMessage, this.actRoute.queryParams)
      .subscribe(([pageInfo, queryParam]) => {
        console.log("CombineLateat: PageInfo: " + pageInfo + " QueryParam: " + queryParam);
        this.pageNo = pageInfo.currentPage;
        this.recordsPerPage = pageInfo.recordsPerPage;
        let p = queryParam['update'];
        if (p == null || p == 'true') {
          this.getEvents();
        }
      })

    // this.subToPageInfo= this.pageInfoService.currentMessage.subscribe(info=>{
    //    this.pageNo=info.currentPage;
    //    this.recordsPerPage=info.recordsPerPage;
    //    console.log(info);
    //    this.getEvents();
    //  })


    // this.subToUpdate=this.actRoute.queryParams.subscribe(param=>{
    //   let p=param['update'];
    //   if(p==null || p=='true'){
    //     this.getEvents();
    //   }
    // });


    // this.subToPageParams=this.actRoute.queryParams.subscribe(param=>{
    //   let pageNumber=param['pageNumber'];
    //   let recordsPerPage=param['recordsPerPage'];
    // })
    console.log("EventList:On Init: Page No" + this.pageNo);
    console.log("EventList:On Init: Records Per Page" + this.recordsPerPage);

  }

  private getEvents() {
    console.log("EventList:GetEvents:" + "page: " + this.pageNo + " records:" + this.recordsPerPage);
    this.restLEventService.getAll(this.pageNo, this.recordsPerPage).subscribe(res => {
      this.eventDto = res;
      console.log(this.eventDto);
    })
  }


  onDelete(id: number) {
    this.restLEventService.deleteById(id).subscribe(() => {
      this.getEvents();
    })
  }

  ngOnDestroy(): void {
    // this.subToPageInfo.unsubscribe();
    // this.subToUpdate.unsubscribe();
    this.sub.unsubscribe();
  }
}
