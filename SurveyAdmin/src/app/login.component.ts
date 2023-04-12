import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Profile } from './entities/profile.entity';
import { ResultApi } from './entities/resultApi.entity';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  title = 'Log in';
  loginform: FormGroup;
  res: ResultApi;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    localStorage.clear();
    this.loginform = this.formbuilder.group({
      username: 'abc',
      password: '123',
    });
  }
  login() {
    var user: User = this.loginform.value;
    console.log(user);
    this.userService.login(user).then(
      (rs) => {
        this.res = rs as ResultApi;
        console.log(this.res);
        if (this.res.results) {
          this.userService.findUser(user.username).then(
            (rs) => {
              var u: Profile = rs as Profile;
              // console.log(u);
              localStorage.setItem('id', u.id.toString());
              localStorage.setItem('name', u.name);
              localStorage.setItem('username', u.username);
              localStorage.setItem('email', u.email);
              localStorage.setItem('password', u.password);
              localStorage.setItem('role', u.role);
              if (u.role == 'Super Admin' || u.role == 'admin') {
                // Swal.fire('Login Success','success', 'success');
                window.location.reload();
              }
              if (u.role == 'staff') {
                Swal.fire(
                  'Login error',
                  'Cannot login with this account',
                  'error'
                );
                localStorage.clear();
                // window.location.reload();
              }
            },
            (err) => {
              Swal.fire('Login!', 'turn on API', 'error');
            }
          );
        }
        if (!this.res.results) {
          Swal.fire(
            'Login error',
            'Password or Username is not correct',
            'error'
          );
        }
      },
      (err) => {
        Swal.fire('Login!', 'turn on API', 'error');
      }
    );
    // localStorage.setItem('username','co session');
  }
}
