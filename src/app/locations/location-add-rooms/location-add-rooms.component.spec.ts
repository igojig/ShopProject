import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAddRoomsComponent } from './location-add-rooms.component';

describe('LocationAddRoomsComponent', () => {
  let component: LocationAddRoomsComponent;
  let fixture: ComponentFixture<LocationAddRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationAddRoomsComponent]
    });
    fixture = TestBed.createComponent(LocationAddRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
