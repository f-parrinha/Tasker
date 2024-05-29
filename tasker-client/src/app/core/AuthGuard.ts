import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './AuthService';

export const authGuard: CanActivateFn = async () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    const isAuthenticated = await authService.authenticate();
    if (isAuthenticated) {
        return true;
    }
    
    router.navigate(['/login']);
    return false;
};