import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularSplitModule } from 'angular-split';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UiModule } from '../ui';
import { MtcmsRoutingModule } from './mtcms-routing.module';

import { MainPageComponent } from './containers/main-page/main-page.component';
//import { EditPageComponent } from './containers/edit-page/edit-page.component';
import { ToolsPageComponent } from './containers/tools-page/tools-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { FileManagerPageComponent } from './containers/file-manager-page/file-manager-page.component';
import { NotFoundPageComponent } from './containers/not-found-page/not-found-page.component';

import { MtcmsState } from '../mtcms/store/mtcms.state';
import { NgxsModule } from '@ngxs/store';

import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DndComponent } from '../mtcms/dnd/dnd/dnd.component';
import { ItemComponent } from '../mtcms/dnd/item/item.component';
import {
  DragAndDropManagerDirective,
  DragAndDropManagerRootDirective,
} from '../mtcms/dnd/_directives/drag-and-drop-manager.directive';

@NgModule({
  declarations: [
    MainPageComponent,
    //EditPageComponent,
    ToolsPageComponent,
    HomePageComponent,
    FileManagerPageComponent,
    NotFoundPageComponent,
    DndComponent,
    ItemComponent,
    DragAndDropManagerDirective,
    DragAndDropManagerRootDirective,
  ],
  imports: [
    CommonModule,
    UiModule,
    AngularSplitModule,
    MtcmsRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    NgxsModule.forFeature([MtcmsState]),

    MatCardModule,
    DragDropModule,
  ],
})
export class MtcmsModule {}
