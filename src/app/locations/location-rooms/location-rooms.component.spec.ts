import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationRoomsComponent } from './location-rooms.component';

describe('LocationRoomsComponent', () => {
  let component: LocationRoomsComponent;
  let fixture: ComponentFixture<LocationRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationRoomsComponent]
    });
    fixture = TestBed.createComponent(LocationRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
