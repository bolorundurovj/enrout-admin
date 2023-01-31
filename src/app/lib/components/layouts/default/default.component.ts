import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'enr-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  public isCollapsed: boolean = false;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout()
  }

}
