import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard2 implements CanActivate {
  constructor(private service: AuthService, private router: Router, private tostr: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.service.isloggedin()) {
      const userRole = this.service.getrole();
      if (userRole === 'user') {
        return true;
      } else {
        this.router.navigate(['']);
        this.tostr.warning('You dont have access.')
        return false;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
