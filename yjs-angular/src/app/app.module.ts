import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { YjsHomeComponent } from './home/yjs-home/yjs-home.component';
import { HomeModule } from './home/home.module';
const routes:Routes = [
  {
    path:"",
    component:YjsHomeComponent,
    children:[
      {path:'demo',loadChildren:'./areas/demo/demo.module#DemoModule'}  //,data:{preload:true} preload 默认加载该模块
    ],
  }
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    RouterModule.forRoot(routes) //引入之可以使用 app.component.html中的 router-outlet 占位符
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
