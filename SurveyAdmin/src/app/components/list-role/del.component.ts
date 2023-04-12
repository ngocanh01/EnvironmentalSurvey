import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/entities/role.entity';
import { RoleService } from 'src/app/services/role.service';

declare let $: any;

@Component({
  templateUrl: './del.component.html',
})
export class DeleteRoleComponent implements OnInit {
  role: Role[];
  id: string;
  constructor(
    private roleService: RoleService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((p) => {
      this.id = p.get('id');
    });
    $('#example1')
      .DataTable({
        responsive: true,
        lengthChange: false,
        autoWidth: true,
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis'],
      })
      .buttons()
      .container()
      .appendTo('#example1_wrapper .col-md-6:eq(0)');

    this.roleService.findall().then(
      (rs) => {
        this.role = rs as Role[];
        console.log(this.role);
      },
      (err) => {
        alert(err);
      }
    );
    this.roleService.findId(this.id).then(
      (rs) => {
        var role: Role = rs as Role;
        if (confirm('Are you want to delete ' + role.name)) {
          console.log(this.id);
          this.roleService.Delete(this.id).then(
            (rs) => {
              alert('Delete ' + role.name + ' success');
              this.router.navigate(['/role']);
            },
            (err) => {
              alert(err);
            }
          );
        } else {
          this.router.navigate(['/role']);
        }
      },
      (err) => {
        alert(err);
      }
    );
  }
}
