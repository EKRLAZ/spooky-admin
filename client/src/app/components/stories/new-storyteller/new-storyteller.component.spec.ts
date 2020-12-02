import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStorytellerComponent } from './new-storyteller.component';

describe('NewStorytellerComponent', () => {
  let component: NewStorytellerComponent;
  let fixture: ComponentFixture<NewStorytellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStorytellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStorytellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
