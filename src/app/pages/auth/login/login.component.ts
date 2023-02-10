import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../lib/services/auth/auth.service";

@Component({
  selector: 'enr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  isLoading = false;

  constructor(private _authService: AuthService, private fb: UntypedFormBuilder) {
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      this._authService.login(this.validateForm.value['email'], this.validateForm.value['password']);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  ngOnInit(): void {
    this._authService.isLoggedIn$.subscribe(() => {
      this.isLoading = false;
    })
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
