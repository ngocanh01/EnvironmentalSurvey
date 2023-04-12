import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entities/user.entity';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';
declare let $: any;
@Component({
  selector: 'user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
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

    this.userService.findall().then(
      (rs) => {
        this.users = rs as User[];
        console.log(this.users);
      },
      (err) => {
        alert(err);
      }
    );
  }
  Del(id) {
    this.userService.findId(id).then(
      (rs) => {
        var user: User = rs as User;
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert " + user.name + '!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.Delete(id).then(
              (rs) => {
                Swal.fire(
                  'Deleted!',
                  'Delete ' + user.name + ' success',
                  'success'
                );
                this.userService.findall().then(
                  (rs) => {
                    this.users = rs as User[];
                    console.log(this.users);
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

    //   this.userService.findId(id).then(
    //     rs => {
    //         var user : User = rs as User
    //         if(confirm("Are you want to delete " + user.name)){
    //             console.log(id);
    //             this.userService.Delete(id).then(
    //                 rs => {
    //                     alert("Delete " + user.name + " success")
    //                     this.userService.findall().then(
    //                       rs =>{
    //                         this.users = rs as User[];
    //                         console.log(this.users);
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
