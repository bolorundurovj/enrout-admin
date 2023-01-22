import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRoleListComponent } from './group-role-list.component';

describe('GroupRoleListComponent', () => {
  let component: GroupRoleListComponent;
  let fixture: ComponentFixture<GroupRoleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupRoleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
