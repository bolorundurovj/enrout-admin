import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {storage} from "../../utils/storage/storage.util";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ILoginResponse, IRegistrationRequest, IUser} from "../../interfaces";
import {ToastService} from "../toast.service";

const apiUrl = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new BehaviorSubject<boolean>(!!storage.getItem('App/session'));

  constructor(private router: Router, private http: HttpClient, private toast: ToastService) {
  }

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  login(email: string, password: string): void {
    const authData = {email: email, password: password};
    this.http
      .post<ILoginResponse>(
        apiUrl + '/login',
        authData
      )
      .subscribe(
        (response) => {
          if (response) {
            storage.setItem('App/session', response);
            storage.setItem('App/token', response.token.accessToken);
            this.toast.success(`Logged in successfully`);
            this.isLoggedIn$.next(true);
            this.router.navigate(['/']).then(() => {

            })
          } else {
            this.toast.error("An error occurred, please try again")
          }
        },
        (error) => {
          console.error(error)
          this.toast.error(`${error.error?.error || 'An error occurred'}`);
          this.isLoggedIn$.next(false);
        }
      );
  }

  register(user: IRegistrationRequest): void {
    const authData = new FormData();
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        // @ts-ignore
        authData.append(key, user[key]);
      }
    }
    this.http
      .post<IUser>(
        apiUrl + '/register',
        authData
      )
      .subscribe(
        (response) => {
          if (response) {
            this.toast.success(`Registered successfully`);
            this.router.navigate(['/auth/login']).then(() => {

            })
          } else {
            this.toast.error("An error occurred, please try again")
          }
        },
        (error) => {
          this.toast.error(`${error?.error || 'An error occurred'}`);
          this.isLoggedIn$.next(false);
        }
      );
  }

  logout(): void {
    storage.removeItem('App/session');
    storage.removeItem('App/token');
    this.isLoggedIn$.next(false);
  }
}
