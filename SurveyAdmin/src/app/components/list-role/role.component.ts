import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/entities/role.entity';
import { RoleService } from 'src/app/services/role.service';

import Swal from 'sweetalert2';
declare let $: any;
@Component({
  selector: 'role',
  templateUrl: './role.component.html',
})
export class RoleComponent implements OnInit {
  role: Role[];

  constructor(
    private roleService: RoleService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
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
  }
  del(id) {
    this.roleService.findId(id).then(
      (rs) => {
        var role: Role = rs as Role;
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert " + role.name + '!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.roleService.Delete(id).then(
              (rs) => {
                Swal.fire(
                  'Deleted!',
                  'Delete ' + role.name + ' success',
                  'success'
                );
                this.roleService.findall().then(
                  (rs) => {
                    this.role = rs as Role[];
                    console.log(this.role);
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              },
              (err) => {
                console.log(err);
              }
            );
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
    //   this.roleService.findId(id).then(
    //     rs => {
    //         var role : Role = rs as Role
    //         if(confirm("Are you want to delete " + role.name)){
    //             console.log(id);
    //             this.roleService.Delete(id).then(
    //                 rs => {
    //                     alert("Delete " + role.name + " success")
    //                     this.roleService.findall().then(
    //                       rs =>{
    //                         this.role = rs as Role[];
    //                         console.log(this.role);
    //                       },
    //                       err =>{
    //                         alert(err);
    //                       }
    //                     )
    //             },
    //                 err => {alert(err)}
    //             )
    //         }
    //     },
    //     err => {alert(err)}
    // );
  }
}
