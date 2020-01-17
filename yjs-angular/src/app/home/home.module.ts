import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YjsMenuComponent } from './yjs-menu/yjs-menu.component';
import { YjsMainComponent } from './yjs-main/yjs-main.component';
import { YjsHomeComponent } from './yjs-home/yjs-home.component';
import { YjsHeaderComponent } from './yjs-header/yjs-header.component';
import { YjsTreeMenuComponent } from './yjs-tree-menu/yjs-tree-menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [YjsHomeComponent,YjsMenuComponent, YjsMainComponent,YjsHeaderComponent, YjsTreeMenuComponent]
})
export class HomeModule { }
