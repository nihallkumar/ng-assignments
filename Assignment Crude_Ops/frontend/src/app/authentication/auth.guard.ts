import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private user = false

  constructor(private authService: AuthenticationService, private router: Router) {
    this.authService.userActive.subscribe(res => {
      this.user = res;
    })
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.user) {
      return true
    }
    else {
      return this.router.createUrlTree(['/auth'])
    }

  }

}
