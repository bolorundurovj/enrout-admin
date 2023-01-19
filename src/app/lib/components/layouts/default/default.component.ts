import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'enr-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  public isCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
