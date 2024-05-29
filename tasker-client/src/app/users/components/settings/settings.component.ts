import { Component } from '@angular/core';
import { FetchingUserDataMessage } from '../../constants';
import { CommonModule } from '@angular/common';
import { GetRequest } from '../../../core/Networking';
import { AuthService } from '../../../core/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  public username: string;
  public email: string;
  public firstName: string;
  public lastName: string;

  constructor(private router: Router, private auth: AuthService) {
    this.username = FetchingUserDataMessage;
    this.email = FetchingUserDataMessage;
    this.firstName = FetchingUserDataMessage;
    this.lastName = FetchingUserDataMessage;
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

    this.username = result.model.username;
    this.email = result.model.email;
    this.firstName = result.model.firstName;
    this.lastName = result.model.lastName;
  }
}
