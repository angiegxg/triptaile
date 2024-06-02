import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAdminUserComponent } from './table-admin-user.component';

describe('TableAdminUserComponent', () => {
  let component: TableAdminUserComponent;
  let fixture: ComponentFixture<TableAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAdminUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
