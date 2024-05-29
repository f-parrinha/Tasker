import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Priority } from '../../constants';


@Component({
  selector: 'app-priority-selector',
  standalone: true,
  imports: [],
  templateUrl: './priority-selector.component.html',
  styleUrl: './priority-selector.component.css'
})
export class PrioritySelectorComponent {
  @Input() initialPriority: number;
  @Output() priorityCallback: EventEmitter<number>;
  @ViewChild('select') selectComponent!: ElementRef<HTMLSelectElement>;
  public values = Priority;


  constructor() {
    this.initialPriority = Priority.LOW;
    this.priorityCallback = new EventEmitter<number>();
  }
  
  onChange(event: any): void {
    this.priorityCallback.emit(event.target.value);
  }

  reset() {
    this.selectComponent.nativeElement.value = Priority.LOW.toString();
  }
}