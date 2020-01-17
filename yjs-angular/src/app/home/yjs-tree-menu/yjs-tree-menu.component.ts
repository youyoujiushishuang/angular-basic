import { Component, OnInit } from '@angular/core';
import { YjsMenuService } from '../../serves/yjs-menu.service';

@Component({
  selector: 'yjs-tree-menu',
  templateUrl: './yjs-tree-menu.component.html',
  styleUrls: ['./yjs-tree-menu.component.css']
})
export class YjsTreeMenuComponent implements OnInit {

  Menus:any[] = []  //菜单
  activeId:any  //当前高亮菜单
  areaName:string = ""  //当前模块名称
  constructor(
    private MenusService:YjsMenuService  //菜单服务  

  ) { }

  ngOnInit() {
    let area = this.MenusService.getMenusVal()
    console.log('area',area);
    // this.MenusService.menusTreeUpdated.subscribe(val=>{
    //   console.log("订阅菜单");
       
    // })
    this.areaName = area["functionName"]
    this.Menus = area["children"]
    this.MenusService.menusTreeUpdated.subscribe((val)=>{
      //点击头部的模块,将左侧菜单进行更新
      this.areaName = val["functionName"]
      this.Menus = val["children"]
    })
  }

  //跳转链接
  routerLink(menu){
    console.log(menu);
    
  }
}
