import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEditRoomsComponent } from './location-edit-rooms.component';

describe('LocationEditRoomsComponent', () => {
  let component: LocationEditRoomsComponent;
  let fixture: ComponentFixture<LocationEditRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationEditRoomsComponent]
    });
    fixture = TestBed.createComponent(LocationEditRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
