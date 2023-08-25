import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  
    constructor(private userService:UsersService, private router:Router){
  
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.userService.currentUser.token) return true;
    console.log(state.url)

    this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}})
    return false;
  }
}

// export const authGuard: CanActivateFn = (route, state) => {
 
//   return true;
// };
