import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  name: string;
  ngOnInit(): void {
    this.name = localStorage.getItem('name');
  }
  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
