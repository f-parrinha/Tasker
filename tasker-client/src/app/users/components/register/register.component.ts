import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NO_CONNECTION_TO_SERVER_MSG, PostRequest } from '../../../core/Networking';
import { AuthService } from '../../../core/AuthService';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public errorMessage: string; 
  private email: string;
  private username: string;
  private password: string;
  private firstName: string;
  private lastName: string;

  constructor(private router: Router, private auth: AuthService) {
    this.errorMessage = "";
    this.email = "";
    this.username = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
  }

  // Events
  onEmailChange(event: any): void {
    this.email = event.target.value;
  }
  onUsernameChange(event: any): void {
    this.username = event.target.value;
  }
  onPasswordChange(event: any): void {
    this.password = event.target.value;
  }
  onFirstNameChange(event: any): void {
    this.firstName = event.target.value;
  }
  onLastNameChange(event: any): void {
    this.lastName = event.target.value;
  }

  async onSubmit(): Promise<void> {
    try {
      const request = await PostRequest("/users/register", {
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      });
      const data = await request.json();

      if (!request.ok) {
        this.errorMessage = data.message;
        return;  
      }

      this.auth.store(data.token, this.username);
      this.router.navigate(['/tasker']);
    } catch (error) {
      this.errorMessage = NO_CONNECTION_TO_SERVER_MSG;
    }
  }
}
