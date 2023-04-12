import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/entities/register.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { User } from 'src/app/entities/user.entity';
import { UserService } from 'src/app/services/user.service';

// import { ConfirmedValidator } from 'src/Validator/confirm.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: string[];
  res: ResultApi;
  msg: string;
  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  save() {
    // var user : User = this.registerForm.value
    var u = this.registerForm.value;
    console.log(u.confirmpassword);
    if (u.password == u.confirmpassword) {
      this.msg = '';
      var user: User = this.registerForm.value;
      var register: Register = {
        name: u.name,
        email: u.email,
        username: u.username,
        password: u.password,
        status: true,
      };
      this.userService.CheckExist(u.username).then(
        (rs) => {
          this.res = rs as ResultApi;
          if (this.res) {
            this.userService.CheckExist(u.email).then((rs) => {
              this.res = rs as ResultApi;
              if (this.res) {
                console.log(register);
                this.userService.Create(register, '4').then(
                  (rs) => {
                    Swal.fire('Register Success', 'success', 'success');
                    this.router.navigate(['/login']);
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              } else {
                Swal.fire('Register error', 'Email is exist', 'error');
              }
            });
          } else {
            Swal.fire('Register error', 'Username is exist', 'error');
          }
          // if(this.res)
        },
        (err) => {
          console.log(err);
        }
      );

      // console.log(register);
    } else {
      this.msg = 'Confirm Password not match';
    }

    // localStorage.setItem('user',user.username);
  }
}
