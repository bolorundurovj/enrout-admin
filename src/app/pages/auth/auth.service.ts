import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {storage} from "../../lib/utils/storage/storage.util";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new BehaviorSubject<boolean>(!!storage.getItem('App/session'));

  constructor(private router: Router) {
  }

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  login(): void {
    storage.setItem('App/session', {user: 'some-user-id', token: 'abc'});
    this.isLoggedIn$.next(true);
    setTimeout(() => {
      this.router.navigateByUrl('/')
    }, 1500)
  }

  logout(): void {
    storage.removeItem('App/session');
    this.isLoggedIn$.next(false);
  }
}
