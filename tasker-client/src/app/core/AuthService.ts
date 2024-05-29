/**
 * Auth
 * 
 * Contains tools for authentication procedures. Token selection and encryption are examples
 * 
 * @author Francisco Parrinha
 */

import { Injectable } from "@angular/core";
import { GetRequest } from "./Networking";
import { BehaviorSubject, Observable } from "rxjs";


const UsernameTag: string = "Username";
const AuthTokenTag: string = "AuthToken";
const ExpirationTime: number = 1200000;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();


    /**
     * Stores the authentication token received from the server and the current username
     * @param token auth token
     * @param username username in session
     */
    public store(token: string, username: string): void {
        this.storeAuthToken(token);
        sessionStorage.setItem(UsernameTag, username);
    }

    /**
     * Validates the stored authentication items and authenticates the user
     * @returns 
     */
    public async authenticate(): Promise<boolean> {
        const isValid = await this.validateAuthentication();

        this.isAuthenticatedSubject.next(isValid);
        return isValid
    }

    public clear(): boolean {
        if (!this.removeAuthToken()) {
            return false;
        }

        this.isAuthenticatedSubject.next(false);
        sessionStorage.removeItem(UsernameTag);
        return true;
    }

    /**
     * Validates the current stored authentication items, but does not actually authenticate the user
     * @returns true or false
     */
    public async validateAuthentication() {
        try {
            const token = this.getAuthToken();
            const username = sessionStorage.getItem(UsernameTag);
    
            // There is no token or the username was lost during session
            if (!token || !username) { 
                return false;
            }
            
            const request = await GetRequest(`/users/validate/${username}`, token);
    
            // Validation failed
            if (!request.ok) {
              return false;  
            }
      
            return true;
        } catch (error) {
            return false;
        }
    }

    public getSessionUser() {
        return sessionStorage.getItem(UsernameTag);
    }

    public getAuthToken(): any {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const tokenCookie = cookies.find(cookie => cookie.startsWith(`${AuthTokenTag}=`));
    
        if (!tokenCookie)
            return null;
    
        return tokenCookie.split('=')[1];
    }
    
    private storeAuthToken(token: string): void {
        const expirationDate = new Date(Date.now() + ExpirationTime);
        document.cookie = `${AuthTokenTag}=${token}; Expires=${expirationDate.toUTCString()}; Path=/`;
    }

    private removeAuthToken(): boolean {
        const token = this.getAuthToken();
        if (!token) {
            return false;    
        }

        const expirationDate = new Date(0);
        document.cookie = `${AuthTokenTag}=; Expires=${expirationDate.toUTCString()}; Path=/`;
        return true;
    }
}