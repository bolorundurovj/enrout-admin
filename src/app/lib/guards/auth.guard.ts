import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../pages/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private _router: Router, private _authService: AuthService) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this._authService.isLoggedIn;
    if (isLoggedIn) {
      return true;
    }

    const callbackURL = segments.map((s) => s.path).join('/');
    this._router.navigate(['/auth/login'], {queryParams: {callbackURL}});
    return false;
  }
}
