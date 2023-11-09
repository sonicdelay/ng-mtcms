import { Component } from '@angular/core';

@Component({
  selector: 'app-tools-page',
  templateUrl: './tools-page.component.html',
  styleUrls: ['./tools-page.component.scss'],
})
export class ToolsPageComponent {
  public matrixData = [];
  public matrixConfig = {};
  constructor() {}

  handler(evt: any) {
    console.log();
  }
}
