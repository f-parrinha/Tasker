import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TaskerComponent } from './tasker/components/tasker/tasker.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AuthService } from './core/AuthService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public title: string;

  constructor(private auth: AuthService, private router: Router) {
    this.title = 'Tasker';
  }
  

  async ngOnInit() {
    const authenticated = await this.auth.authenticate();
    
    if (!authenticated) {
      this.router.navigate(['/login']);
    }
  }
}
