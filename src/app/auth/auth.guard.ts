import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";
import { NbAuthService } from "@nebular/auth";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private nbAuthService: NbAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.nbAuthService.isAuthenticated();
  }
}
