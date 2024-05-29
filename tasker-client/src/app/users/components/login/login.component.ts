import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NO_CONNECTION_TO_SERVER_MSG, PostRequest } from '../../../core/Networking';
import { AuthService } from '../../../core/AuthService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public errorMessage: string;
  private username: string;
  private password: string;

  constructor(private router: Router, private auth: AuthService) {
    this.username = "";
    this.password = "";
    this.errorMessage = "";
  }

  ngOnInit(): void {
    this.auth.clear();
  }

  onUsernameChange(event: any): void {
    this.username = event.target.value;
  }

  onPasswordChange(event: any): void {
    this.password = event.target.value;
  }

  async onSubmit(): Promise<void>{
    try {
      const request = await PostRequest("/users/login", {
        username: this.username,
        password: this.password
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
