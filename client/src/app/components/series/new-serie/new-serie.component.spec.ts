import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSerieComponent } from './new-serie.component';

describe('NewSerieComponent', () => {
  let component: NewSerieComponent;
  let fixture: ComponentFixture<NewSerieComponent>;

  beforeEach(async(() => {
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
