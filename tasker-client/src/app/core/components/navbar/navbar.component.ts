import { Component , OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faSignOut, faTasks, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../AuthService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  public userIcon: IconDefinition = faUser;
  public logoutIcon: IconDefinition = faSignOut;
  public taskerIcon: IconDefinition = faTasks;
  public isAuthenticated: boolean;

  constructor(private router: Router, private auth: AuthService) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  /**********
   * EVENTS * 
   **********/

  public onLogOut(): void {
    this.auth.clear();
    this.router.navigate(['/login']);
  }
}
