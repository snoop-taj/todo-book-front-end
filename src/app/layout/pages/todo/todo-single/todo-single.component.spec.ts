import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSingleComponent } from './todo-single.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NetworkService, AuthService } from '../../../../shared';

describe('TodoSingleComponent', () => {
  let component: TodoSingleComponent;
  let fixture: ComponentFixture<TodoSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoSingleComponent ],
      providers: [ NetworkService, AuthService ],
      imports: [ HttpClientModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
