import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { Role } from 'src/app/entities/role.entity';
import { User } from 'src/app/entities/user.entity';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';
declare let $: any;
@Component({
  selector: 'add-user',
  templateUrl: './addUser.component.html',
})
export class AddUserComponent implements OnInit {
  roles: Role[];
  res: ResultApi;
  formAdd: FormGroup;
  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.roleService.findall().then(
      (rs) => {
        this.roles = rs as Role[];
      },
      (err) => {
        alert(err);
      }
    );
    this.formAdd = this.formbuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      status: true,
      role: '4',
    });
    $('#startDate').datetimepicker({
      icons: { time: 'far fa-clock' },
    });
    $('#endDate').datetimepicker({
      icons: { time: 'far fa-clock' },
    });
    $('#summernote').summernote();
  }
  save() {
    var user: User = this.formAdd.value;
    // console.log(user.role)
    // console.log(user.username);
    var roles = user.role.toString();
    this.userService.CheckExist(user.username).then(
      (rs) => {
        this.res = rs as ResultApi;
        // console.log(this.res);
        if (this.res) {
          this.userService.CheckExist(user.email).then(
            (rs) => {
              this.res = rs as ResultApi;
              if (this.res) {
                this.userService.Create(user, roles).then(
                  (rs) => {
                    // alert("success")
                    Swal.fire('Add User!', 'User has been added.', 'success');
                    this.router.navigate(['/user']);
                  },
                  (err) => {
                    Swal.fire('Add User!', err, 'error');
                  }
                );
                // Swal.fire('Add User!', 'User has been added.', 'success');
              } else {
                Swal.fire('Add User!', 'Email is exist', 'error');
              }
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          Swal.fire('Add User!', 'username is exist', 'error');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
