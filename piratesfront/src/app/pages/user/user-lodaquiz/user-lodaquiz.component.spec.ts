import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLodaquizComponent } from './user-lodaquiz.component';

describe('UserLodaquizComponent', () => {
  let component: UserLodaquizComponent;
  let fixture: ComponentFixture<UserLodaquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLodaquizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLodaquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
