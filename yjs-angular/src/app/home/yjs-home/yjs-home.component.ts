import { Component, OnInit } from '@angular/core';
import { YjsMenuService } from '../../serves/yjs-menu.service';

@Component({
  selector: 'yjs-home',
  templateUrl: './yjs-home.component.html',
  styleUrls: ['./yjs-home.component.css']
})
export class YjsHomeComponent implements OnInit {

  constructor(
    private Menus:YjsMenuService //菜单服务
  ) { }

  ngOnInit() {
    this.Menus.initMenu()  //初始化模块和菜单数据
  } 

}
