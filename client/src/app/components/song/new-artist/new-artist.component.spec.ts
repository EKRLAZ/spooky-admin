import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewArtistComponent } from './new-artist.component';

describe('NewArtistComponent', () => {
  let component: NewArtistComponent;
  let fixture: ComponentFixture<NewArtistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
