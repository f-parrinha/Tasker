import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskerButtonComponent } from './tasker-button.component';

describe('TaskerButtonComponent', () => {
  let component: TaskerButtonComponent;
  let fixture: ComponentFixture<TaskerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskerButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
