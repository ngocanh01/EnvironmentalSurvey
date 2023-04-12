import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/entities/role.entity';
import { RoleService } from 'src/app/services/role.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'add-role',
  templateUrl: './addRole.component.html',
})
export class AddRoleComponent implements OnInit {
  formAdd: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private roleService: RoleService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formAdd = this.formbuilder.group({
      name: '',
    });
  }
  save() {
    var role: Role = this.formAdd.value;
    console.log(role);
    this.roleService.Create(role).then(
      (rs) => {
        Swal.fire('Add Role!', 'Role has been added.', 'success');
        this.router.navigate(['/role']);
      },
      (err) => {
        Swal.fire('Add Role!', err, 'error');
      }
    );
  }
}
