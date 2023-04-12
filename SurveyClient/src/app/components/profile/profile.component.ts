import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user.entity';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  users: User[];
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    console.log(localStorage.getItem('username'));
    if (localStorage.getItem('username') != null) {
      this.username = localStorage.getItem('username');
      this.name = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
      this.role = localStorage.getItem('role');
      // console.log(this.username)
    } else {
      this.router.navigate(['/login']);
    }
  }
}
