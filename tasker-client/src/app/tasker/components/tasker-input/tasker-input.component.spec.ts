import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskerInputComponent } from './tasker-input.component';

describe('TaskerInputComponent', () => {
  let component: TaskerInputComponent;
  let fixture: ComponentFixture<TaskerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskerInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
