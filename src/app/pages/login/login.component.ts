import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResLogin } from 'src/app/models/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @Output() loginEvent = new EventEmitter<boolean>();

  loginForm = new FormGroup({
    idName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  http = inject(HttpClient);
  baseURL = 'http://localhost:3000/';
  onLogin() {
    this.http
      .post<ResLogin>(this.baseURL + 'user/login', this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.loginForm.setValue({ idName: '', password: '' });
          this.loginEvent.emit(true);
          if (response) {
            window.localStorage.setItem('user-token', response.token);
          }
        },
        error: (error:Error) => {
          console.error('Request failed with error\n' + error.message);
        },
      });
  }
}
