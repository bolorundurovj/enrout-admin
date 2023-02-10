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

  get loggedInUser(): IUser | undefined  {
    return storage.getItem('App/session')?.user;
  }

  /**
   * It takes in an email and password, sends a post request to the backend, and if the response is successful, it stores
   * the response in the browser's local storage, and navigates to the home page
   * @param {string} email - The email address of the user
   * @param {string} password - string - The password of the user
   */
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
            this.router.navigate(['/']);
          } else {
            this.toast.error("An error occurred, please try again")
          }
        },
        (error) => {
          this.toast.error(`${error.error?.error || 'An error occurred'}`);
          this.isLoggedIn$.next(false);
        }
      );
  }

  /**
   * It takes a user object, converts it to a form data object, and sends it to the backend
   * @param {IRegistrationRequest} user - IRegistrationRequest
   */
  register(user: IRegistrationRequest): void {
    const authData = new FormData();
    for (const key in user) {
      // eslint-disable-next-line
      if (user.hasOwnProperty(key)) {
        // eslint-disable-next-line
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
            this.router.navigate(['/auth/login']);
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

  /**
   * It removes the session and token from local storage, sets the isLoggedIn$ observable to false, and navigates to the
   * login page
   */
  logout(): void {
    storage.removeItem('App/session');
    storage.removeItem('App/token');
    this.isLoggedIn$.next(false);
    this.router.navigateByUrl('auth/login')
  }
}
