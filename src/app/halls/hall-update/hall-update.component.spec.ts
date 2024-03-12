import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallUpdateComponent } from './hall-update.component';

describe('HallUpdateComponent', () => {
  let component: HallUpdateComponent;
  let fixture: ComponentFixture<HallUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HallUpdateComponent]
    });
    fixture = TestBed.createComponent(HallUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
