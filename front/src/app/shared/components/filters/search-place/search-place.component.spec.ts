import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPlaceComponent } from './search-place.component';

describe('SearchPlaceComponent', () => {
  let component: SearchPlaceComponent;
  let fixture: ComponentFixture<SearchPlaceComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
