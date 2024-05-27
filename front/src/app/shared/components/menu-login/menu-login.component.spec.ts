import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuLoginComponent } from './menu-login.component';

describe('MenuLoginComponent', () => {
  let component: MenuLoginComponent;
  let fixture: ComponentFixture<MenuLoginComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
