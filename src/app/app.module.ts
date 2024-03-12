import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FestivalComponent} from './festivals/festival-component/festival.component';
import {FormsModule} from "@angular/forms";
import {EditFestivalComponent} from './festivals/fest-details/edit-festival.component';
import {AddFestivalComponent} from './festivals/add-festival/add-festival.component';
import {MenuComponent} from './menu/menu.component';
import {RouterLinkActive} from "@angular/router";
import { HallComponent } from './halls/hall/hall.component';
import { AboutComponent } from './about/about.component';
import { HallAddComponent } from './halls/hall-add/hall-add.component';
import { HallUpdateComponent } from './halls/hall-update/hall-update.component';
import { LocationComponent } from './locations/location/location.component';
import { LocationRoomsComponent } from './locations/location-rooms/location-rooms.component';
import { LocationAddRoomsComponent } from './locations/location-add-rooms/location-add-rooms.component';
import { LocationEditRoomsComponent } from './locations/location-edit-rooms/location-edit-rooms.component';


@NgModule({
  declarations: [
    AppComponent,
    FestivalComponent,
    EditFestivalComponent,
    AddFestivalComponent,
    MenuComponent,
    HallComponent,
    AboutComponent,
    HallAddComponent,
    HallUpdateComponent,
    LocationComponent,
    LocationRoomsComponent,
    LocationAddRoomsComponent,
    LocationEditRoomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterLinkActive,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
