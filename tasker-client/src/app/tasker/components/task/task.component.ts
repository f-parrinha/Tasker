import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PrioritySelectorComponent } from '../priority-selector/priority-selector.component';
import { TaskerButtonComponent } from '../tasker-button/tasker-button.component';
import { CommonModule } from '@angular/common';
import { faPaperPlane, faTrash, faRotateLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonColors, TaskInputColor } from '../../constants';
import { AutosizeModule } from 'ngx-autosize';
import { TaskModel } from '../../models/TaskModel';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, TaskerButtonComponent, PrioritySelectorComponent, FontAwesomeModule,AutosizeModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  @Input() id: string;
  @Input() description: string;
  @Input() priority: number;
  @Output() onUpdate: EventEmitter<TaskModel>;
  @Output() onDelete: EventEmitter<TaskModel>;
  @ViewChild('descriptionEl') descriptionEl!:  ElementRef;
  public style: { color: string };
  public colors: { updateButton: string, resetButton: string, deleteButton: string };
  public isEditing: boolean;
  public currentDescription: string;
  public currentPriority: number;
  public icons : {faPaperPlane: IconDefinition, faTrash: IconDefinition, faRotateLeft: IconDefinition} = {
    faPaperPlane: faPaperPlane,
    faTrash: faTrash,
    faRotateLeft: faRotateLeft
  };
  private isFocused: boolean;
  
  constructor() {
      this.id = "";
      this.description = "";
      this.priority = -1;
      this.onUpdate = new EventEmitter<TaskModel>();
      this.onDelete = new EventEmitter<TaskModel>();
      this.isEditing = false;
      this.isFocused = false;
      this.currentDescription = "";
      this.currentPriority = -1;
      this.style = {
        color: TaskInputColor.IDLE
      };
      this.colors = {
        updateButton: ButtonColors.DEFAULT,
        resetButton: ButtonColors.DEFAULT,
        deleteButton: ButtonColors.DANGER
      }

  }

  ngOnInit(): void {
    this.currentDescription = this.description;
    this.currentPriority = this.priority;
  }

  taskNotEdited(): boolean{
    return this.currentPriority === this.priority && this.currentDescription === this.description;
  }

  resetEdit(): void {
      this.currentDescription = this.description;
      this.currentPriority = this.priority;
      this.descriptionEl.nativeElement.innerText = this.description;
      this.updateEditState();
  }

  updateEditState(): void {
    if (!this.isFocused && this.taskNotEdited()) {
      this.style.color = TaskInputColor.IDLE;
      this.isEditing = false;
      return;
    }

    this.style.color = TaskInputColor.FOCUSED;
    this.isEditing = !this.taskNotEdited();
  }


  // Events
  onDescriptionChange(event: any): void {
    this.currentDescription = (event.target as HTMLDivElement).innerText;
    this.updateEditState();
  }
  onPriorityChange(priority: number): void {
    this.currentPriority = Number(priority);
    this.updateEditState();
  }
  onFocus(): void {
    this.isFocused = true;
    this.updateEditState();
  } 
  onBlur(): void {
    this.isFocused = false;
    this.updateEditState();
  }
  onSubmitDelete(): void {
    this.onDelete.emit(new TaskModel(this.id));
  }
  onSubmitUpdate(): void {
    this.onUpdate.emit(new TaskModel(this.id, this.currentDescription, this.currentPriority));
    this.isEditing = false;
  }
  onSubmitReset(): void {
    this.resetEdit()
  }
}

