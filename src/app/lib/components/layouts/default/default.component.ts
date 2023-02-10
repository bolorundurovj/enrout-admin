import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'enr-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  user = this._authService.loggedInUser;
  isCollapsed: boolean = false;

  constructor(private _authService: AuthService) {
  }

  logout() {
    this._authService.logout()
  }
}
