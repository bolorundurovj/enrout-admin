import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./pages/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  isLoggedIn$!: Observable<boolean>;

  constructor(private _authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn$;
  }
}
