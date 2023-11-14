import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, OnChanges, ɵgetUnknownElementStrictMode } from '@angular/core';
import { BackendService } from '../../../shared/services/backend.service';
import { ActivatedRoute } from '@angular/router';
import { Node } from '../../../shared/models/node.interface';
import { Inject } from '@angular/core';


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UiFormForm } from '../../../ui/models/form-form.interface';


@Component({
  selector: 'app-admin-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  private path = '/api/nodes/';
  public rootId: string = "00000000-0000-4000-8000-000000000000";
  public currentNodeId: string = this.rootId;
  public currentNodeType: string = "UNKOWN";
  public currentNodeTitle: string = "NODE";

  public listOfFields = [];
  public listOfNodeIds = [];
  public listOfChildren = [];
  public breadcrumb = [];
  public nodeFormConfig: UiFormForm = {
    "name": "nodeForm",
    "submit": true,
    "controls": [
      {
        "name": "sample1",
        "label": "Sample Field 1:",
        "value": "Prefilled",
        "type": "text",
        "validators": {
          "required": true
        },
        "disabled": false
      },
      {
        "name": "sample2",
        "label": "Sample Field 2:",
        "value": "Prefilled",
        "type": "textarea",
        "validators": {
          "required": true
        },
        "disabled": false
      },
    ]
  };
  public nodeFormData: any = {};

  public data: any;
  private sub: any;
  private preset: Node = {
    id: '0',
    type: '<TO-DO>',
    update: new Date(),
    sync: {},
    data: {
      0: {
        parent: 'uuid',
        title: 'string',
        icon: 'node',
        position: 10,
        reviewGroup: '0',
        protected: false,
        meta: {},
        values: {
          en: {}
        }
      }
    }
  };
  @ViewChild('mytemplate')
  mytemplate!: TemplateRef<any>;

  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    const loc = window.location;
    this.path = `${loc.protocol}//${loc.host}/api/nodes/`;
    this.data = this.preset;
  }

  ngOnInit() {
    //this.getIds('');
    this.sub = this.route.params.subscribe(params => {
      this.currentNodeId = params['id'] || this.rootId;
      console.log("ID =", this.currentNodeId);
      this.prepareData(this.currentNodeId);
      this.updateDisplay(this.currentNodeId);
    });
  }


  ngOnAfterInit() {
    this.updateDisplay(this.currentNodeId);

  }

  updateDisplay(id: string) {
    // const data = this.getIds(id);
    // console.log(typeof data, data);
    // this.data = data;
    // //console.log(this.data);
    this.getChildren(id);
    //this.getBreadcrumb(id);
    // console.log(this.breadcrumb);
    // this.data = this.breadcrumb[0];
  }


  getChildren(id: string) {
    this.backendService.getData(`${this.path}${id}/children`).subscribe(
      (data: any) => {
        this.listOfChildren = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getBreadcrumb(id: string) {
    this.backendService.getData(`${this.path}${id}/breadcrumb`).subscribe(
      (data: any) => {
        this.breadcrumb = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  prepareData(id: string): void {
    this.backendService.getData(`${this.path}${id}/editor`).subscribe(
      (data: any) => {
        this.currentNodeType = data?.type;
        this.currentNodeTitle = data?.data[0].title;

        // this.nodeFormConfig.controls

        this.listOfFields = data.fields;
        this.breadcrumb = data.breadcrumb;
        const fields: any[] = [];
        data.fields.map((field: any) => {
          this.nodeFormConfig.controls.push(
            {
              "name": field.name,
              "label": field.label,
              "value": "ABC",
              "type": field.baseType,
              "validators": {
                "required": false
              },
              "data": [
                { "name": "name", "value": "value" }
              ],
              "disabled": false
            }
          );
          // this.nodeFormData[field.name] = data.data[0].values["en"][field.name] || "empty";
        });
        const config = {
          "name": "nodeForm",
          "submit": true,
          "controls": fields
        };

        this.nodeFormConfig = { ...this.nodeFormConfig };
        //this.nodeFormConfig = config;
        console.log(data, fields);
        console.log(this.nodeFormConfig);
        //delete data.fields;
        //delete data.breadcrumb;
        this.data = data;
      },
      err => {
        console.log(err);
      }
    );


  }

  // getIds(id: string): any {
  //   this.backendService.getData(`${this.path}${id}`).subscribe(
  //     data => {
  //       console.log(data);
  //       this.data = data;
  //       //return data;
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  create() {
    //this.openDialog();
    const name = window.prompt('Title:', 'NewNode');
    if (name) {
      const data = this.preset;
      data.data['0'].title = name;
      data.data['0'].parent = this.currentNodeId;
      // data.update = new Date();
      //this.create();
      console.log(data);
      this.backendService.postData(this.path, data).subscribe(
        data => {
          console.log("ADMINPAGEDATA...", data);
          this.data = data;
          this.currentNodeId = this.data.id;
          this.updateDisplay(this.currentNodeId);
          //this.getIds('');
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  read() {
    this.prepareData(this.currentNodeId);
    this.updateDisplay(this.currentNodeId);
  }

  root() {
    this.prepareData(this.currentNodeId);
    this.updateDisplay(this.rootId);
  }

  update() {
    this.backendService
      .putData(this.path + this.currentNodeId, this.data)
      .subscribe(
        data => {
          this.data = data;
          this.updateDisplay(this.currentNodeId);
        },
        err => {
          console.log(err);
          //alert(err.error.message);
        }
      );
  }

  delete() {
    if (window.confirm(`Delete ${this.currentNodeId}?`)) {
      this.backendService.deleteData(this.path + this.currentNodeId).subscribe(
        data:any => {
          this.data = data;
          this.currentNodeId = this.breadcrumb.pop() || this.rootId;
        },
        err : ɵgetUnknownElementStrictMode => {
          console.log(err);
        }
      );
      this.updateDisplay(this.currentNodeId);
      //this.getIds('');
    }
  }





  openDialog(): void {
    const dialogRef = this.dialog.open(this.mytemplate, {
      width: '250px',
      data: { name: "this.name", animal: "this.animal" },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      //this.animal = result;
    });
  }
}
