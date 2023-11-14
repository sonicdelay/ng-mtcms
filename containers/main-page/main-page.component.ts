import { Component, OnInit, ElementRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  dark = false;
  navItems = [
    { name: 'Home', route: './' },
    { name: 'Edit', route: './edit' },
    { name: 'Files', route: './files' },
    { name: 'Tools', route: './tools' },
    // { name: 'Admin', route: './admin' },
    { name: '-----', route: '' },
    { name: 'Engine', route: '../engine' },
    { name: '-----', route: '' },
    { name: 'Root', route: '/' },
  ];

  constructor(
    private element: ElementRef<HTMLElement>,
    private overlayContainer: OverlayContainer) { }

  toggleFullscreen() {
    // Cast to `any`, because the typings don't include the browser-prefixed methods.
    const elem = this.element.nativeElement.querySelector('#mtcms-main') as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }

  ngOnInit() { }

}
