import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { IconButtonComponent } from '@siemens/core-ui';
import { ActionMessage } from 'src/app/shared/models/action-message.interface';
import { BackendService } from '../../../shared/servcies/backend.service';

@Component({
  selector: 'app-file-manager-page',
  templateUrl: './file-manager-page.component.html',
  styleUrls: ['./file-manager-page.component.scss'],
})
export class FileManagerPageComponent implements OnInit {
  public path = 'api/fm/';
  public currentPath = '';
  public items: any = [];
  private sub: any;

  public display = 'cards';

  constructor(
    private backendService: BackendService,
    private router: Router
  ) {
    this.backendService = backendService;
    this.router = router;
    console.log(this.router.url);
  }

  ngOnInit() {
    console.log('File item ...');
    console.log(this.router);
    // this.sub = this.backendService.getData.params.subscribe(params => {
    //   //this.currentNodeId = params.id || this.rootId;
    //   //this.updateDisplay(this.currentNodeId);
    // });
    // ${id}
    // this.backendService.getData(`${this.path}`).subscribe(
    //   (data: any[]) => {
    //     console.log(data);
    //     //data.sort((a:any, b:any) => a.type > b.type ? 1 : 0);
    //     this.items = [data];
    //   },
    //   (err: any) => {
    //     console.log(err);
    //   }
    // );
    this.loadFolder(this.currentPath);
  }

  ngOnDestroy() {
    console.log('Destroy');
    //this.sub.unsubscribe();
  }

  private loadFolder(path: string) {
    console.log(`${this.path}${path}`);
    this.backendService.getData(`${this.path}${path}`).subscribe(
      (data: any) => {
        console.log(data);
        data.sort((a: any, b: any) => (a.type > b.type ? 1 : -1));
        this.items = data;
        this.currentPath = path;

        console.log(this.currentPath);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  private loadFile(path: string) {
    //`${this.path}${path}`);
    //const blob = new Blob([data], { type: 'text/csv' });
    //const url= window.URL.createObjectURL(blob);
    const url = `${this.path}${path}`;
    window.open(url);
  }

  public clickHandler(item: any) {
    console.log(item);
    if (item.type == 'file') {
      this.loadFile(`${item.path}`);
    } else {
      this.loadFolder(`${item.path}`);
      // this.router.navigateByUrl("/");
    }
  }

  public handler(action: ActionMessage | any) {
    console.log('action', action);
  }
}
