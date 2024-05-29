import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonColors } from '../../constants';



@Component({
  selector: 'app-tasker-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasker-button.component.html',
  styleUrl: './tasker-button.component.css'
})
export class TaskerButtonComponent implements OnInit {
  @Input() text: string;
  @Input() color: string;
  @Input() width: number;
  @Input() height: number;
  @Input() padToRight: boolean;
  @Output() onClick: EventEmitter<any>;
  
  constructor() {
    this.text = "";
    this.color = ButtonColors.DEFAULT;
    this.width = 50;
    this.height = 10;
    this.padToRight = true;
    this.onClick = new EventEmitter<any>();
  }

  finalStyle = {
    height: '',
    width: '',
    marginLeft: '',
    marginRight: ''
  }

  ngOnInit(): void {
    this.finalStyle = {
      height: `${this.height}px`,
      width: `${this.width}px`,
      marginLeft: this.padToRight ? '1rem' : '0',
      marginRight: this.padToRight ? '0' : '1rem',
    }
  }

  triggerOnClick(event: Event) : void {
    this.onClick.emit(event);
  }
}

