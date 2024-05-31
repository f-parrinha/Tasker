import { Component, Input, OnInit } from '@angular/core';
import { TaskerInputComponent } from '../tasker-input/tasker-input.component';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { DeleteRequest, GetRequest, NO_CONNECTION_TO_SERVER_MSG, PostRequest, PutRequest } from '../../../core/Networking';
import { TaskModel } from '../../models/TaskModel';
import { AuthService } from '../../../core/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasker',
  standalone: true,
  imports: [TaskComponent, TaskerInputComponent, CommonModule],
  templateUrl: './tasker.component.html',
  styleUrl: './tasker.component.css'
})
export class TaskerComponent implements OnInit {
  @Input() errorMessage: string;
  public tasks : Array<{id: string, description: string, priority: number}>;

  private username: string = "";
  private token: string = "";

  constructor(private auth: AuthService) {
    this.tasks = [];
    this.errorMessage = "";
  }

  async ngOnInit(): Promise<void> {
    this.username = this.auth.getSessionUser() ?? "";
    this.token = this.auth.getAuthToken() ?? "";

    this.onGetTasks(); 
  }

  
  /********** 
   * EVENTS *
   **********/

  async onGetTasks(): Promise<void>  {
    try {
      const request = await GetRequest(`tasker/${this.username}/tasks`, this.token);
      const data = await request.json();

      if (!request.ok) {
        this.errorMessage = data.message;
        return;
      }

      this.tasks = data.tasks;
    } catch (error) {
      this.errorMessage = NO_CONNECTION_TO_SERVER_MSG;
    }
  }
  
  async onAddTask (model: TaskModel): Promise<void>  {
    try {
      const request = await PostRequest(`tasker/${this.username}/add`, {
          description: model.getDescription(),
          priority: model.getPriority()
      }, this.token);
      const data = await request.json();

      if (!request.ok) {
        this.errorMessage = data.message;
        return;
      }

      this.tasks = data.tasks;
    } catch (error) {
      this.errorMessage = NO_CONNECTION_TO_SERVER_MSG;
    }
  }

  async onDeleteTask(model: TaskModel): Promise<void>  {
    try {
      const request = await DeleteRequest(`tasker/${this.username}/delete?id=${model.getId()}`, this.token);
      const data = await request.json();

      if (!request.ok) {
        this.errorMessage = data.message;
        return;
      }
      
      this.tasks = data.tasks;
    } catch (error) {
      this.errorMessage = NO_CONNECTION_TO_SERVER_MSG;
    }
  }

  async onUpdateTask(model: TaskModel): Promise<void> {
    try {
      const request = await PutRequest(`tasker/${this.username}/update`, {
          id: model.getId(),
          description:  model.getDescription(),
          priority:  model.getPriority()
      }, this.token);
      const data = await request.json();

      if (!request.ok) {
        this.errorMessage = data.message;
        return;
      }
      
      this.tasks = data.tasks;
    } catch (error) {
      this.errorMessage = NO_CONNECTION_TO_SERVER_MSG;
    }
  }
}
