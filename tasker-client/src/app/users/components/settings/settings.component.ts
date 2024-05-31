import { Component, ElementRef, ViewChild } from '@angular/core';
import { FetchingUserDataModel } from '../../constants';
import { CommonModule } from '@angular/common';
import { GetRequest } from '../../../core/Networking';
import { AuthService } from '../../../core/AuthService';
import { Router } from '@angular/router';
import { TaskInputColor } from '../../../tasker/constants';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  public username: string = "";
  public currentEmail: string = "";
  public currentFirstName: string = "";
  public currentLastName: string = "";
  public resetLockedCSS: string = "";
  public updateModalOn: boolean = false;
  public deleteModalOn: boolean = false;
  public style: { color: string } = { color: TaskInputColor.IDLE };

  private email: string = "";
  private firstName: string = "";
  private lastName: string = "";
  private isEditing: boolean = false;
  private isFocused: boolean = false;

  constructor(private router: Router, private auth: AuthService) {
    this.setData(FetchingUserDataModel);
  }



  async ngOnInit(): Promise<void> {
    this.requestUserData();
  }

  public async requestUserData(): Promise<void> {
    const username = this.auth.getSessionUser();
    const token = this.auth.getAuthToken();
    const request = await GetRequest(`/users/details/${username}`, token);

    
    if (!request.ok) {
      this.router.navigate(['/tasker']);
    }

    const result = await request.json();
    this.setData(result.model);
  }

  public reset(): void {
    this.currentEmail = this.email;
    this.currentFirstName = this.firstName;
    this.currentLastName = this.lastName;
    this.updateEditState();
  }

  public toggleUpdateModal(value: boolean): void {
    this.updateModalOn = value;
  }

  public toggleDeleteModal(value: boolean): void {
    this.deleteModalOn = value;
  }

  /** Events */
  public onEmailChange(event: any): void {
    this.currentEmail = event.target.value;
    this.updateEditState();
  }
  public onFirstNameChange(event: any): void {
    this.currentFirstName = event.target.value;
    this.updateEditState();
  }
  public onLastNameChange(event: any): void {
    this.currentLastName = event.target.value;
    this.updateEditState();
  }

  private setData(model: any): void {
    this.username = model.username;
    this.email = model.email;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.currentEmail = this.email;
    this.currentFirstName = this.firstName;
    this.currentLastName = this.lastName;
  }

  private updateEditState(): void {
    if (!this.isFocused && this.noEditOnSettings()) {
      this.style.color = TaskInputColor.IDLE;
      this.isEditing = false;
      return;
    }

    this.style.color = TaskInputColor.FOCUSED;
    this.isEditing = !this.noEditOnSettings();
  }

  /**
   * Checks whether the settings page has been edited
   * @returns true or false
   */
  private noEditOnSettings(): boolean{
    return this.currentEmail === this.email && this.currentFirstName === this.firstName && this.currentLastName === this.lastName;
  }
}
