import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeriatorComponent } from './edit-seriator.component';

describe('EditSeriatorComponent', () => {
  let component: EditSeriatorComponent;
  let fixture: ComponentFixture<EditSeriatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSeriatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSeriatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
