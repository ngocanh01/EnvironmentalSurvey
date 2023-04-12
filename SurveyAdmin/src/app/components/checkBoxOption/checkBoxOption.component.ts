import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'option-checkBox',
  templateUrl: './checkBoxOption.component.html',
})
export class CheckBoxOptionComponent implements OnInit {
  ngOnInit(): void {}

  add() {
    var wrapper = document.querySelector('.wrapper');
    var checkbox = document.querySelector('.item');
    console.log(checkbox);
    wrapper.appendChild(checkbox);
  }
}
