import { Routes } from '@angular/router';
import { TaskerComponent } from './tasker/components/tasker/tasker.component';
import { LoginComponent } from './users/components/login/login.component';
import { RegisterComponent } from './users/components/register/register.component';
import { ErrorPageComponent } from './core/components/error-page/error-page.component';
import { SettingsComponent } from './users/components/settings/settings.component';
import { authGuard } from './core/AuthGuard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'tasker', component: TaskerComponent, canActivate: [authGuard]},
    {path: 'settings', component: SettingsComponent, canActivate: [authGuard]},
    {path: "", redirectTo: "/login", pathMatch: 'full'},
    {path: "**", component: ErrorPageComponent, pathMatch: 'full'}];
