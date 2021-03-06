import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { YjsMenuService } from '../../serves/yjs-menu.service';
declare var $ : any
@Component({
  selector: 'yjs-header',
  templateUrl: './yjs-header.component.html',
  styleUrls: ['./yjs-header.component.css']
})
export class YjsHeaderComponent implements OnInit {

  constructor(
    private el: ElementRef,
    private Menus:YjsMenuService  //菜单服务  
  ) { }

  areasModel:any[] = []  //所有菜单
  showAreasList:any[] = []  //能够显示的菜单数据
  moreAreasList:any[] = []  //显示不下的下拉菜单中的菜单数据
  activeMenu:any = null  //当前的模块
  activeFunctionName:string  //当前菜单
  availableSpace:any  //可用宽度
  numOfVisibleItems  //可见菜单个数
  requiredSpace:any  //必须的宽度
  breakWidth:any[] = []  //所有菜单都展示的宽度区间
  ngOnInit() {
    this.areasModel= this.Menus.getAreasVal()  //从菜单服务中获取所有模块数据
    console.log('this.areasModel',this.areasModel);
    
    this.showAreasList = this.areasModel
  }

  ngAfterViewInit(): void {
    var timer = setInterval(()=>{
      //设置定时器来获取dom元素
      if(this.el.nativeElement.querySelectorAll(".area").length != 0){
        let lis = this.el.nativeElement.querySelectorAll(".area")
        let totalSpace = 0
        for (let i = 0; i < lis.length; i++) {
          totalSpace += parseInt(lis[i].clientWidth)         
          this.breakWidth.push(totalSpace) 
        }
        this.check()  //根据窗口宽度刷新菜单
        clearInterval(timer) //清除定时器
      }
    })
    
  }

  @HostListener("window:resize",["$event"])onresize(event){
    this.check()
  }

  //鼠标移入菜单
  menuMouseover(functionId){
    this.activeMenu = functionId
  }

  //鼠标移出菜单
  menuMouseout(functionId){
    this.activeMenu = null
  }

  //获取菜单之后,实现响应式菜单,将溢出的菜单移到下拉列表中显示
  check(){
    this.availableSpace = this.el.nativeElement.querySelector("nav").clientWidth -
      this.el.nativeElement.querySelector(".sidebar-toggle").clientWidth -
      this.el.nativeElement.querySelector(".navbar-custom-menu").clientWidth - 100  //将可用宽度减去100
    console.log('可用宽度', this.availableSpace);
    
    this.el.nativeElement.querySelector(".nav").style.width = this.availableSpace + 100 + 'px'  //随着窗口的改变,设置ul的宽度
    this.numOfVisibleItems = this.showAreasList.length  //可见的菜单个数
    this.requiredSpace = this.breakWidth[this.numOfVisibleItems - 1] //可见菜单所需的宽度
    if(this.requiredSpace > this.availableSpace){
      //如果可用空间不够,就将最后一个放进下拉列表中
      this.numOfVisibleItems -= 1
      this.showAreasList = this.areasModel.slice(0, this.numOfVisibleItems)
      this.moreAreasList = this.areasModel.slice(this.numOfVisibleItems)
      this.el.nativeElement.querySelector(".nav").style.overflow = this.moreAreasList.length ? null : 'hidden'  //下拉按钮是否展示
      this.check()
    } else if(this.availableSpace > this.breakWidth[this.numOfVisibleItems]){
      //如果可用宽度足够展示多一个菜单,就将下拉框中菜单减少一个
      this.numOfVisibleItems += 1
      this.showAreasList = this.areasModel.slice(0, this.numOfVisibleItems)
      this.moreAreasList = this.areasModel.slice(this.numOfVisibleItems)
      this.el.nativeElement.querySelector(".nav").style.overflow = this.moreAreasList.length ? null : 'hidden'  //下拉按钮是否展示
      this.check()
    }
  }

  clickAreas(menu){
    this.Menus.setMenusVal(menu)  //点击模块之后,修改全局菜单数据
    this.activeFunctionName = menu.functionName

  }
}
