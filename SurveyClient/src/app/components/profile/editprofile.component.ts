import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { User } from 'src/app/entities/user.entity';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  editprofileForm: FormGroup;
  user: string[];
  res: ResultApi;
  msg: string;
  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.editprofileForm = this.formbuilder.group({
      name: [localStorage.getItem('name'), [Validators.required]],
      email: [localStorage.getItem('email'), [Validators.required]],
      username: [localStorage.getItem('username'), [Validators.required]],
    });
  }
  save() {
    var u = this.editprofileForm.value;
    if (
      u.name == localStorage.getItem('name') &&
      u.username == localStorage.getItem('username') &&
      u.email == localStorage.getItem('email')
    ) {
      this.router.navigate(['/profile']);
    } else {
      if (u.username == localStorage.getItem('username')) {
        var user: User = {
          id: parseInt(localStorage.getItem('id')),
          name: u.name,
          email: u.email,
          username: u.username,
          password: localStorage.getItem('password'),
          status: true,
        };
        this.userService.Update(user, '4').then(
          (rs) => {
            Swal.fire('Edit Profile Success', 'success', 'success');
            this.router.navigate(['/login']);
          },
          (err) => {
            console.log(err);
          }
        );
      }
      if (u.username != localStorage.getItem('username')) {
        var user: User = {
          id: parseInt(localStorage.getItem('id')),
          name: u.name,
          email: u.email,
          username: u.username,
          password: localStorage.getItem('password'),
          status: true,
        };
        this.userService.CheckExist(user.username).then(
          (rs) => {
            this.res = rs as ResultApi;
            if (this.res) {
              this.userService.Update(user, '4').then(
                (rs) => {
                  Swal.fire('Edit Profile Success', 'success', 'success');
                  this.router.navigate(['/login']);
                },
                (err) => {
                  console.log(err);
                }
              );
            } else {
              Swal.fire('Edit Profile Error', 'Username is exist', 'error');
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }
  // var user : User = this.editprofileForm.value
}
