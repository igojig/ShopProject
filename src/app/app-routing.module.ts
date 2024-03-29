import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FestivalComponent} from "./festivals/festival-component/festival.component";
import {EditFestivalComponent} from "./festivals/edit-festival/edit-festival.component";
import {AddFestivalComponent} from "./festivals/add-festival/add-festival.component";
import {HallComponent} from "./halls/hall/hall.component";
import {AboutComponent} from "./about/about.component";
import {HallAddComponent} from "./halls/hall-add/hall-add.component";
import {HallUpdateComponent} from "./halls/hall-update/hall-update.component";
import {LocationComponent} from "./locations/location/location.component";
import {LocationRoomsComponent} from "./locations/location-rooms/location-rooms.component";
import {LocationEditRoomsComponent} from "./locations/location-edit-rooms/location-edit-rooms.component";
import {LocationAddRoomsComponent} from "./locations/location-add-rooms/location-add-rooms.component";
import {EventListComponent} from "./events/event-list/event-list.component";
import {EventAddComponent} from "./events/event-add/event-add.component";
import {EventEditComponent} from "./events/event-edit/event-edit.component";
import {EventContainerComponent} from "./events/event-container/event-container.component";

const routes: Routes = [
  {
    path: 'festivals',
    component: FestivalComponent,
    children: [
      {path: 'edit/:id', component: EditFestivalComponent},
      {path: 'add', component: AddFestivalComponent}
    ]
  },
  // {
  //   path: 'festivals/edit/:id',
  //   component: EditFestivalComponent
  // },
  // {
  //   path: 'festivals/add',
  //   component: AddFestivalComponent
  // },
  {
    path: 'halls',
    component: HallComponent,
    children: [
      {path: 'edit/:id', component: HallUpdateComponent},
      {path: 'add', component: HallAddComponent}
    ]
  },
  // {
  //   path: 'halls/add',
  //   component: HallAddComponent
  // },
  // {
  //   path: 'halls/edit/:id',
  //   component: HallUpdateComponent
  // },
  {
    path: 'rooms',
    component: LocationComponent,
    children: [
      {
        path: 'details/:id', component: LocationRoomsComponent,
        children: [
          {path: 'edit/:id', component: LocationEditRoomsComponent},
          {path: 'add', component: LocationAddRoomsComponent}
        ]
      }
    ]
  },
  {
    path: 'events', component: EventContainerComponent,
      children:[
        {path: 'add', component: EventAddComponent},
        {path: 'edit/:id', component: EventEditComponent}
      ]
  },


  {
    path: 'about',
    component: AboutComponent
  },
  {path: '', redirectTo: 'about', pathMatch: 'full'}
  // { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
