/**
 * 模块菜单数据获取并发布
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YjsMenuService {

  areasUpdated:Subject<any> = new Subject<any>()  //将模块设定为全局变量
  menusTreeUpdated:Subject<any> = new Subject<any>()  //将菜单设定为全局变量
  private subjectMenusTree:any[];  //菜单数据
  private subjectAreas:any[];  //模块数据
  allMenus:any[] = []
  constructor() { }

  initMenu(){
    this.allMenus = [
      {functionName:"主菜单", css:null, functionId:"0", children:[
        
        {functionName:"业务中心1", css:null, functionId:"1", children:[ {functionName:"发起流程", functionId:"11", children:[]}, {functionName:"待办流程", functionId:"12", children:[]}]},
        {functionName:"开发实例2", css:null, functionId:"2", children:[ {functionName:"流程图", functionId:"21", children:[]}, {functionName:"图片预览", functionId:"22", children:[]}]},
        {functionName:"开发实例3", css:null, functionId:"3", children:[ {functionName:"流程图", functionId:"31", children:[]}, {functionName:"图片预览", functionId:"32", children:[]}]},
        {functionName:"开发实例4", css:null, functionId:"4", children:[ {functionName:"流程图", functionId:"41", children:[]}, {functionName:"图片预览", functionId:"42", children:[]}]},
        {functionName:"开发实例5", css:null, functionId:"5", children:[ {functionName:"流程图", functionId:"51", children:[]}, {functionName:"图片预览", functionId:"52", children:[]}]},
        {functionName:"开发实例6", css:null, functionId:"6", children:[ {functionName:"流程图", functionId:"61", children:[]}, {functionName:"图片预览", functionId:"62", children:[]}]},
        {functionName:"开发实例7", css:null, functionId:"7", children:[ {functionName:"流程图", functionId:"71", children:[]}, {functionName:"图片预览", functionId:"72", children:[]}]},
        {functionName:"开发实例8", css:null, functionId:"8", children:[ {functionName:"流程图", functionId:"81", children:[]}, {functionName:"图片预览", functionId:"82", children:[]}]},
        {functionName:"开发实例9", css:null, functionId:"9", children:[ {functionName:"流程图", functionId:"91", children:[]}, {functionName:"图片预览", functionId:"92", children:[]}]},
        {functionName:"开发实例10",css:null, functionId:"10", children:[ {functionName:"流程图", functionId:"101", children:[]}, {functionName:"图片预览", functionId:"102", children:[]}]},
        ]}
      ]
    //获取模块数据
    this.subjectAreas = this.allMenus[0]["children"]
    //发布模块数据
    this.areasUpdated.next(this.subjectAreas)
    //获取菜单数据
    this.subjectMenusTree = this.subjectAreas[0]
    //发布菜单数据
    this.menusTreeUpdated.next(this.subjectMenusTree)
  }
  //获取所有模块
  getAreasVal(){
    return this.subjectAreas
  }

  //获取左侧菜单
  getMenusVal(){
    return this.subjectMenusTree
  }

  //设置左侧菜单
  setMenusVal(menu){
    //参数是点击的那个模块
    //从所有模块中找到选中的模块
    let avtiveArea = this.subjectAreas.filter(area=>area.functionId == menu.functionId)[0]
    this.subjectMenusTree = avtiveArea
    //发布菜单数据
    this.menusTreeUpdated.next(this.subjectMenusTree)

  }
}
