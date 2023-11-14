import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tools-page',
  templateUrl: './tools-page.component.html',
  styleUrls: ['./tools-page.component.scss']
})
export class ToolsPageComponent implements OnInit {
  public matrixData = []
  public matrixConfig = {

  }
  constructor() { }

  ngOnInit() {


  }

  handler(evt: any) {
    console.log();
  }
}
