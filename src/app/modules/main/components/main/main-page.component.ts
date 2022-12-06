import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectTypeEvent(event: string): void {
    console.log('Select type asset',event);

  }

  selectPropertyEvent(event: string): void {
    console.log('Select property asset',event);

  }

}
