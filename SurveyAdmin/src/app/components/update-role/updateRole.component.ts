import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Role } from 'src/app/entities/role.entity';
import { RoleService } from 'src/app/services/role.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'update-role',
  templateUrl: './updateRole.component.html',
})
export class UpdateRoleComponent implements OnInit {
  id: string;
  formUpdate: FormGroup;

  constructor(
    private roleSevice: RoleService,
    private activeRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((p) => {
      var id = p.get('id');
      // console.log(id);
      this.id = id;
    });
    this.roleSevice.findId(this.id).then(
      (res) => {
        var role: Role = res as Role;
        // console.log(user);
        this.formUpdate = this.formbuilder.group({
          id: role.id,
          name: role.name,
        });
      },
      (err) => {
        alert(err);
      }
    );
  }
  save() {
    var role: Role = this.formUpdate.value;
    console.log(role);
    this.roleSevice.Update(role).then(
      (rs) => {
        // if(confirm("edit success"))
        // {this.route.navigate(['/role'])}
        Swal.fire('Update Role!', 'Role has been updated.', 'success');
        this.route.navigate(['/role']);
      },
      (err) => {
        Swal.fire('Update Role!', err, 'error');
      }
    );
  }
}
