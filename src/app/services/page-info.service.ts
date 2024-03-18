import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PagesInfo} from "../events/event-pages/event-pages.component";

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {

  private pagesInfo = new BehaviorSubject<PagesInfo>({currentPage: -1, recordsPerPage: -1});
  currentMessage = this.pagesInfo.asObservable();

  constructor(

  ){ }

  changeMessage(message: PagesInfo) {
    this.pagesInfo.next(message);
  }


}
