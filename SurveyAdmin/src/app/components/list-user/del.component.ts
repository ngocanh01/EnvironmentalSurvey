import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entities/user.entity';
import { UserService } from 'src/app/services/user.service';

declare let $: any;
@Component({
  selector: 'user',
  templateUrl: './del.component.html',
})
export class DeleteUserComponent implements OnInit {
  users: User[];
  id: string;
  constructor(
    private userService: UserService,
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

    this.userService.findall().then(
      (rs) => {
        this.users = rs as User[];
        console.log(this.users);
      },
      (err) => {
        alert(err);
      }
    );

    this.userService.findId(this.id).then(
      (rs) => {
        var user: User = rs as User;
        if (confirm('Are you want to delete ' + user.name)) {
          console.log(this.id);
          this.userService.Delete(this.id).then(
            (rs) => {
              alert('Delete ' + user.name + ' success');
              this.router.navigate(['/user']);
            },
            (err) => {
              alert(err);
            }
          );
        } else {
          this.router.navigate(['/user']);
        }
      },
      (err) => {
        alert(err);
      }
    );
  }
}
