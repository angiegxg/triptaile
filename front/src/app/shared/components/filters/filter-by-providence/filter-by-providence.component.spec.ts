import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterByProvidenceComponent } from './filter-by-providence.component';

describe('FilterByProvidenceComponent', () => {
  let component: FilterByProvidenceComponent;
  let fixture: ComponentFixture<FilterByProvidenceComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterByProvidenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByProvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
