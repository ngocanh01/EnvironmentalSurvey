import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/entities/profile.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { User } from 'src/app/entities/user.entity';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  res: ResultApi;
  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private router: Router
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
              this.router.navigate(['/home']);
            },
            (err) => {
              console.log(err);
            }
          );
        }
        if (!this.res.results) {
          Swal.fire({
            icon: 'error',
            title: 'Username or Password incorrect!',
            text: 'Please try again !.',
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
    //  this.userService.findUser(user.username).then(
    //   rs => {
    //     var u : User = rs as User
    //     if(u != null){
    //       // console.log(u.);
    //       console.log(u.password);
    //       // var pass = bcrypt.hash(u.password,10)
    //       // console.log(pass);
    //       if(u.status == true){
    //         alert('true password')
    //       }
    //     }
    //     else{
    //       alert('sai');
    //     }
    //   }
    //  )
  }
}
