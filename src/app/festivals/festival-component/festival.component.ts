import {Component, OnInit} from '@angular/core';
import {FestivalRestService} from "../../services/festival-rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FestivalDto} from "../../dtos/festivalDto";
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-festival-component',
  templateUrl: './festival.component.html',
  styleUrls: ['./festival.component.css']
})
export class FestivalComponent implements OnInit {

  festivalDtos: FestivalDto[];
  subToParam: Subscription;

  constructor(private rest: FestivalRestService,
              private router: Router,
              private actRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    console.log(this.festivalDtos);
    this.getFestivals();
    console.log(this.festivalDtos);
    this.subToParam = this.actRoute.queryParamMap.subscribe(param => {
      let id = param.get('update');
      console.log(id);
      if (id == 'true') {
        console.log(" request from subscription");
        this.getFestivals();
      }
    })
  }

  public getFestivals() {

    return this.rest.getAll().subscribe({
      next: response => {
        console.log('GET response received')
        console.log(response);
        this.festivalDtos = response;
      },
      error: error => {
        console.error('GET Request failed with error')
        alert(error);
      },
      complete: () => console.log('GET Request completed')
    });
  }

  onDelete(id: number) {
    console.log(id);
    this.rest.delete(id)
      .subscribe(
        (response) => {                           //Next callback
          console.log('response received')
          console.log(response);
          // this.festivalDtos = response;
          // console.log(this.repos);
          this.getFestivals();
        },
        (error) => {                              //Error callback
          console.error('Request failed with error')
          alert(error);
        },
        () => {                                   //Complete callback
          console.log('Request completed')
        }
      );
  }
}
