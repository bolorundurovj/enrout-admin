import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./lib/services/auth/auth.service";
import {ToastService} from "./lib/services/toast.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  isLoggedIn$!: Observable<boolean>;
  isOnline: boolean;

  constructor(private _authService: AuthService, private toastService: ToastService) {
    this.isOnline = false;
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn$;

    this.updateOnlineStatus();

    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
    this.toastService.info(this.isOnline ? "Connection Established" : "No Internet Connection");
  }
}
