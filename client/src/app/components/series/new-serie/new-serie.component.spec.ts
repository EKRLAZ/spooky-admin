import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewSerieComponent } from './new-serie.component';

describe('NewSerieComponent', () => {
  let component: NewSerieComponent;
  let fixture: ComponentFixture<NewSerieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
