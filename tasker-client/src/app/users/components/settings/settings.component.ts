import { Component, ElementRef, ViewChild } from '@angular/core';
import { FetchingUserDataModel } from '../../Constants';
import { CommonModule } from '@angular/common';
import { DeleteRequest, GetRequest, PostRequest, PutRequest } from '../../../core/Networking';
import { AuthService } from '../../../core/AuthService';
import { Router } from '@angular/router';
import { TaskInputColor } from '../../../tasker/Constants';
import { faWheatAwnCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { UserModelBuilder } from '../../models/UserModel';

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
  public errorMessage: string = "";
  public style: { color: string } = { color: TaskInputColor.IDLE };

  private password: string = "";
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

  public async submitUpdate(): Promise<void> {
    /** We do not require the auth token ont this action due to password prompting */

    const model = new UserModelBuilder()
      .withUsername(this.username)
      .withPassword(this.password)
      .withEmail(this.currentEmail)
      .withFirstName(this.currentFirstName)
      .withLastName(this.currentLastName)
      .build();

    const request = await PutRequest(`/users/update/${this.username}`, model);
    const data = await request.json();

    if (!request.ok) {
      this.errorMessage = data.message;
      return;
    }

    this.setData(data.model);
    this.updateEditState();
    this.toggleUpdateModal(false);
  }

  public async submitDelete(): Promise<void> {
    // Validate password to make sure the user wants to delete
    const validateRequest = await PostRequest(`/users/validate/${this.username}`, { password: this.password });
    const validateData = await validateRequest.json();

    if (!validateRequest.ok) {
      this.errorMessage = validateData.message;
      return;
    }

    // Finally send delete request
    const token = this.auth.getAuthToken();
    const deleteRequest = await DeleteRequest(`/users/delete/${this.username}`, token);
    const deleteData = await deleteRequest.json();

    if (!deleteRequest.ok) {
      this.errorMessage = deleteData.message;
      return;
    }

    this.auth.clear();
    this.router.navigate(['/login']);
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

  /** Modal's Togglers */
  public toggleUpdateModal(value: boolean): void {
    this.updateModalOn = value;
    this.password = "";
    this.errorMessage = "";
  }
  public toggleDeleteModal(value: boolean): void {
    this.deleteModalOn = value;
    this.password = "";
    this.errorMessage = "";
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
  public onPasswordChange(event: any): void {
    this.password = event.target.value;
  }

  /** Sets all compoent's data */
  private setData(model: any): void {
    this.username = model.username;
    this.email = model.email;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.currentEmail = this.email;
    this.currentFirstName = this.firstName;
    this.currentLastName = this.lastName;
  }

  /** Updates the current edit satus for the settings page */
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
