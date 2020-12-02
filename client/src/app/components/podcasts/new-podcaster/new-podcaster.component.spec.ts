import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPodcasterComponent } from './new-podcaster.component';

describe('NewPodcasterComponent', () => {
  let component: NewPodcasterComponent;
  let fixture: ComponentFixture<NewPodcasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPodcasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPodcasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
