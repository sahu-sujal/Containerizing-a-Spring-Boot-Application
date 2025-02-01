import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserArticleComponent } from './user-article.component';

describe('UserArticleComponent', () => {
  let component: UserArticleComponent;
  let fixture: ComponentFixture<UserArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
