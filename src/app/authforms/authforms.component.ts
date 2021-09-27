import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authforms',
  templateUrl: './authforms.component.html',
  styleUrls: ['./authforms.component.css']
})
export class AuthformsComponent implements OnInit {
  authFlag: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  changeFlag(flag: number): void {
    this.authFlag = flag;
  }

}
