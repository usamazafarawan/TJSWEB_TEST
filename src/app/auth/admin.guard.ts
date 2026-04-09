// src/app/auth/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const token = localStorage.getItem('access-token');
        console.log(token);
        if (!token) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        const helper = new JwtHelperService();
        const decoded: any = helper.decodeToken(token);
        console.log(decoded);
        if (decoded?.accessLevel === 1) {
            return true;
        }

        this.router.navigate(['/pages/check-inventory']);
        return false;
    }
}
