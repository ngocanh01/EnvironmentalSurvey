import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/entities/role.entity';
import { User } from 'src/app/entities/user.entity';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'update-user',
  templateUrl: './updateUser.component.html',
})
export class UpdateUserComponent implements OnInit {
  roles: Role[];
  id: string;
  formUpdate: FormGroup;
  constructor(
    private userSevice: UserService,
    private activeRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private roleService: RoleService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((p) => {
      var id = p.get('id');
      // console.log(id);
      this.id = id;
    });
    this.userSevice.findId(this.id).then(
      (res) => {
        var user: User = res as User;
        console.log(user);
        this.formUpdate = this.formbuilder.group({
          id: [user.id, [Validators.required]],
          name: [user.name, [Validators.required]],
          email: [user.email, [Validators.required]],
          username: [user.username, [Validators.required]],
          password: [
            user.password,
            [Validators.required, Validators.minLength(8)],
          ],
          status: user.status,
          role: user.role,
        });
      },
      (err) => {
        alert(err);
      }
    );
    this.roleService.findall().then(
      (rs) => {
        this.roles = rs as Role[];
      },
      (err) => {
        alert(err);
      }
    );
  }
  save() {
    var user: User = this.formUpdate.value;
    // console.log(role);
    var roles = user.role.toString();
    // console.log(roles);
    this.userSevice.Update(user, roles).then(
      (rs) => {
        // if(confirm("edit success"))
        // {this.route.navigate(['/role'])}
        Swal.fire('Update User!', 'User has been Updated.', 'success');
        this.router.navigate(['/user']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
