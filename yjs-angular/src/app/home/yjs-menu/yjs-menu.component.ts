import { Component, OnInit, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'yjs-menu',
  templateUrl: './yjs-menu.component.html',
  styleUrls: ['./yjs-menu.component.css']
})
export class YjsMenuComponent implements OnInit {

  constructor(private el: ElementRef) { }

  body:any
  heightOfBox:string  //左侧菜单的高度
  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.body = this.el.nativeElement.querySelector("aside").parentNode.parentNode.parentNode.parentNode.parentNode
      let bodyHeight = this.body["offsetHeight"]
      let boxHeight = bodyHeight -50 -50 //减去头部高度和用户名高度,其他都是左侧菜单的高度
      this.heightOfBox = boxHeight + 'px'
    }, 0);

  }
  
  @HostListener("window:resize",["$event"])onresize(event){
    if(this.body){
      let bodyHeight = this.body["offsetHeight"]
      let boxHeight = bodyHeight -50 -65  //减去头部高度和用户名高度,其他都是左侧菜单的高度
      this.heightOfBox = boxHeight + 'px'
    }
  }
}
