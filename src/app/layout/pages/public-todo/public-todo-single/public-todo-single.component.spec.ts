import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTodoSingleComponent } from './public-todo-single.component';

describe('PublicTodoSingleComponent', () => {
  let component: PublicTodoSingleComponent;
  let fixture: ComponentFixture<PublicTodoSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicTodoSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTodoSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
