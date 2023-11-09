import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './containers/main-page/main-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { EditPageComponent } from './containers/edit-page/edit-page.component';
import { FileManagerPageComponent } from './containers/file-manager-page/file-manager-page.component';
import { ToolsPageComponent } from './containers/tools-page/tools-page.component';
import { NotFoundPageComponent } from './containers/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'edit', component: EditPageComponent },
      { path: 'edit/:id', component: EditPageComponent },
      {
        path: 'files',
        component: FileManagerPageComponent,
        children: [{ path: '**', component: FileManagerPageComponent }],
      },
      { path: 'tools', component: ToolsPageComponent },
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtcmsRoutingModule {}
