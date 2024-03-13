import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFestivalComponent } from './edit-festival.component';

describe('FestDetailsComponent', () => {
  let component: EditFestivalComponent;
  let fixture: ComponentFixture<EditFestivalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFestivalComponent]
    });
    fixture = TestBed.createComponent(EditFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
