import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TaskerButtonComponent } from '../tasker-button/tasker-button.component';
import { PrioritySelectorComponent } from '../priority-selector/priority-selector.component';
import { CommonModule } from '@angular/common';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonColors, Priority, TaskInputColor } from '../../constants';
import { TaskModel, TaskModelBuilder } from '../../models/TaskModel';


@Component({
  selector: 'app-tasker-input',
  standalone: true,
  imports: [TaskerButtonComponent, PrioritySelectorComponent, CommonModule, FontAwesomeModule],
  templateUrl: './tasker-input.component.html',
  styleUrl: './tasker-input.component.css'
})
export class TaskerInputComponent {
  @Input() description: string;
  @Input() priority: number;
  @Output() onSubmit: EventEmitter<TaskModel>;
  @ViewChild('input') inputComponent!: ElementRef<HTMLInputElement>;
  @ViewChild('prioritySelector') priorityComponent!: PrioritySelectorComponent;

  public buttonColor = ButtonColors.SUCCESS;
  public style =  {
    color: TaskInputColor.FOCUSED
  };
  public icons : {faPlus: IconDefinition} = {
    faPlus: faPlus
  };

  
  constructor() {
    this.description = "";
    this.priority = Priority.LOW;
    this.onSubmit = new EventEmitter<TaskModel>(); 
  }

  onInput(event: any) {
    this.description = event.target.value;
  }

  setPriority(priority: number) {
    this.priority = priority;
  }

  resetState() {
    this.inputComponent.nativeElement.value = ""
    this.priorityComponent.reset();
  }

  // Events

  onSubmitAddTask(event: any): void {
    const model: TaskModel = new TaskModelBuilder()
                    .withDescription(this.description)
                    .withPriority(this.priority)
                    .build();

    this.onSubmit.emit(model);
    this.resetState();
  }
}
