import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewComponent } from './review.component';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
