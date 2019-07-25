



# angular4 

## 1 angular简介

angular的核心:组件,其他的东西都是为了组件而服务的
脚手架: AngularCLI
服务端渲染
移动和桌面的兼容

### 1.1 环境的搭建

npm i @angular/cli -g
使用 ng -v 查看安装结果

在脚手架下载成功之后,会在电脑登录用户的文件中: C:\Users\Administrator.USER-20181010VE\AppData\Roaming 中有一个npm的文件夹,其中就有各种全局安装的包,比如: vue脚手架,angular脚手架,npm,cnpm,yarn ...

如果有现成的npm文件夹,也可以直接进行替换

### 1.2 创建项目

ng new auction  --- auction是项目的名字,会在当前目录下生成一个名为auction的项目

### 1.3 创建的项目目录介绍

 `e2e` : 做单元测试的
 `src` : 项目源代码,我们自己写的代码都要在这里
`angular-cli.json`: 是angular命令行的配置文件
`karma.conf.js` : karma是单元测试的执行器 , 这个文件是用来执行自动化测试的
`package.json` : 是npm 的标准配置化文件, 里面有所有的第三方依赖包
`tslint.json` : 是定义typescript代码质量检查的一些规则

### 1.4 组件必须包含以下三个部分

+ 组件原数据装饰器: @component()
+ 组件模板: Template
+ 控制器: Controller

先用typescript先定义一个类,然后告诉angular这是一个组件,然后将装饰器中的属性--原数据 附加到这;

@component()装饰器中的属性定义了什么:
selector: 以什么标签放置这个组件
templateUrl : 这个组件要用到的模板,就是组件的结构,以及其中绑定的数据
styleUrls : 这是一个数组,是这个组件要用到的css文件
个类上;

控制器: 是指一个被component装饰器装饰的typescript类,它包含所有的属性和方法,

与页面相关的大部分逻辑都是编辑在这个控制器里面的

+ 组件还包含一些可选部分:

1. 输入属性@Inputs() : 用来接收外部传入的数据的,使父组件可以直接传递数据给子组件

2. 提供器providers : 用来做依赖注入的
3. 生命周期钩子LifeCycle Hooks : 组件的生命周期函数
4. 样式表styles : 可以提供一个样式表文件,可以为组件提供一些专用的样式,不是必须的

5. 动画Animations : angular提供了专门的动画,可以为组件提供一些动画效果,比如: 淡入淡出
6. 输出属性@Outputs() : 是用来定义其他组件可能会感兴趣的事件,或者在组件中共享数据

模块--app.module.js : 用 @NgModule声明一个模块,里面的declarations用来声明这个模块中有什么东西,declarations这个里面只能声明组件,指令和管道,另外还有 imports属性,这是模块要运转还需要的东西,也就是依赖的其他模块;还有providers 用来指定用来提供什么服务,最后 bootstrap 属性能够用来声明主组件是什么

### 1.5 angular的启动过程

+ 加载时加载 项目根目录下的 index.html 和 main.ts脚本
+ 在main.ts文件中的最后,会指定整个angular的起点,指定的是 AppModule 作为主模块
+ 然后会加载这个模块(再此过程中,angular会分析要加载此模块还需要依赖哪些其他的模块,比如app.module.ts中的: BrowserModule , FormsModule , HttpModule ; 之后还会分析,这些模块还需要哪些模块,一直到所有的模块都加载完毕)

+ 当加载完之后, angular会在 index.html中去寻找启动模块(AppModule)的主组件(AppComponent) 对应的css选择器(app-root),也就是说,加载完主模块之后,会去index.html中寻找app-root这个标签,并且会用主组件指定的模板内容(app.component.html)去替换掉app-root这个标签,在这个替换过程完成之前,页面上会显示app-root这个标签中所写的内容

### 1.6启动项目

 npm start  启动项目之后,建立起来的开发环境会自动检测 src目录下的改变 , 有任何改变都会使服务器自动重新加载,刷新页面



## 2 实战项目准备

1. 安装开发依赖的第三方包: npm i jquery bootstrap@3.3.7 -S

2. 在angular.json文件中的styles属性和scripts属性中把第三方包用到的css和js文件放进去,比如 './node_modules/jquery/dist/jquery.min.js'

3. 此时还不能在项目中使用jquery , 因为 typescript 文件中不能直接使用$,需要在终端中 输入 npm i @types/jquery @types/bootstrap -S  装jquery的typescript的类型描述文件,让 typescript认识 jquery 和 booystrap 的代码

4. angular提供了在命令行中自动添加组件的指令 : ng g component 组件名 , 在app文件夹中会自动添加一个组件的文件夹,里面有四个文件

   

   ### 2.2 angular4 的指令

#### 2.2.1 循环指令 : *ngFor

```html
<div *ngFor="let product of products"></div>
```


这里的products 数组存在于组件的ts文件中的生命周期钩子中,已经定义好了,会渲染出多个div

#### 2.2.2 属性绑定

`<img [src]="imgUrl" />`


将img标签中绑定src属性,属性值是 imgUrl , 这个值是在控制器中定义好的



#### 2.2.3 样式绑定 

[class.red]="isRed"  ---这也是属性绑定的一种

表示 标签中是否绑定red 这个样式, 是由 isRed 这个值来决定的,如果 isRed 为 true , 就绑定 red 这个样式, 否则不绑定

#### 2.2.4 输入属性 

将父组件的值传递给子组件使用

4.1  在父组件ts文件中要有子组件需要的数据
4.2  子组件ts文件中声明属性 childMsg ,使用@input() 进行标识,标识这个属性
是需要父组件传递数据的 , 比如 : 

```ts
@input() private rating:number = 0
```

4.3 在子组件的选择器(子组件在父组件中以标签的形式使用时)上使用属性绑定的
方式将父组件的值传递过来,比如:

```html
<app-stars [rating]="product.rating"></app-stars>
```

这里是表示: 这里的 app-stars组件的rating属性是由父组件的product属性中的rating数据提供的

#### 2.2.5 事件绑定 

在标签上绑定事件

```html
  <button (click)="clickMe()">点我</button>
```

这里的clickMe事件在此组件中的 ts 文件中定义



## 3 路由

路由信息都是在 app.routing.module.ts文件中进行配置的,在组件中都不知道路由创建一个新项目来实操router的练习: ng new 项目名 --routing使用上面这个指令生成的项目会比普通的项目在app文件夹下多一个 app-routing.module.ts文件, 这个文件就是用来配置路由的,并且会将这个模块暴露出去,AppComponent模块会接收这个模块

```js

// app.routing.module.ts文件: 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

const routes : Routes = [
    {
        path:'',
        children:[]
    }
];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    providers:[]
})
export class AppRoutingModule {}

//在 app.module.ts文件中:
import { AppRoutingModule } from './app.routing.module';
imports: [
    xxx,
    AppRoutingModule
  ]

//注意:在手动添加此文件之后,再次生成组件,会报错
ng g component home 
//More than one module matches. Use skip-import option to skip importing the component into the closest module.
//解决方法:
ng g component home --module=app.module
```

| 名称          | 简介                                                         |
| ------------- | ------------------------------------------------------------ |
| RouterOutlet  | 插座-- 在Html中标记路由内容呈现位置的占位符指令              |
| Router        | 负责在运行是执行路由的对象,可以通过调用其navigate()和 navigateByUrl() 方法来导航到一个指定的路由,在控制器中使用 |
| ROuterLink    | 在Html中声明路由导航用的指令,在模板html中使用                |
| ActivtedRoute | 当前激活的路由对象,保存着当前路由的信息,比如路由地址,路由参数等 |
| Routes        | 路由配置,保存着哪个URL对应展示的是哪个组件,以及在哪个 RouterOutlet 中展示组件 |



### 3.1 Routes  

路由配置,保存着哪个URL对应展示的是哪个组件,以及在哪个 
RouterOutlet 中展示组件
在项目中的 app-routing.module.ts文件中定义路由:

```js
import {HomeComponent} from "./home/home.component"
import {ProductComponent} from "./product/product.component"
const routes : Routes = [
    //注意:这里的path写路径的时候,不能用 / 开头 , 是因为angular中不使用/可以随意使用相对路径和绝对路径进行导航 , 未来在url地址栏中显示的路由是 : localhost:4200/product , 说明这里配置的路由都是根路由

    {path:'',component:HomeComponent},
    {path:'product',component:ProductComponent},
];
```


### 3.2 RouterOutlet 插座

 在Html中标记路由内容呈现位置的占位符指令
可以在 app.component.html文件中使用` <router-outlet></router-outlet>`来占位,表示这里将展示一个组件

### 3.3 Router 

负责在运行是执行路由的对象,可以通过调用其navigate()和 navigateByUrl() 方法来导航到一个指定的路由
在组件中的ts文件中, 可以拿到路由对象:

navigate()方法里面传入一个数组,和 RouterLink的值的写法是一样的


```js
export class AppComponent {
  title = 'project';
  constructor(private router:Router){

  }
  toProductDetails(){
    //使用路由导航,使用路由对象,在constructor中依赖注入
    this.router.navigate(['/product'])
  }
}
```


### 3.4 RouterLink

在Html中声明路由导航用的指令
一般在a 并且中使用,指定跳转的路由地址 :

```html
<a [routerLink]="['/']">主页</a>
```

这里的routerLink的值是一个数组,因为以后可以在里面传递一些参数

### 3.5 ActivtedRoute 

当前激活的路由对象,保存着当前路由的信息,比如路由地址,路由参数等

**详细使用见3.7路由传参**

### 3.6 通配路由

当地址栏中输入了一个不存在的路由时,可以使用通配符进行配置,首先创建一个新组件, ng g component code404 , 在html中写上页面不存在这句话,然后在路由中加入一条: {path : '**' , component : COde404Component},配置完之后,当用户访问不存在的地址时,将展示 Code404Component 这个组件

```js
import { Code404Component } from './code404/code404.component';
{path:'**',component:Code404Component}
```

**注意**:通配符的路由一定要放在路由的最后面

### 3.7 路由传参

#### 3.7.1 在查询参数中传递数据:

1.在查询参数中传递数据: http://localhost:4200/product?id=1  

要改造路由链接,在后面传递参数

```html
<a [routerLink]="['/product']" [queryParams]="{id:1}">跳转到商品页</a>
```

如果是使用路由导航进项跳转:

```js
this.router.navigate(['/settings'],{
    queryParams:{
        title:'标题'
    }
});
```

接收参数的方式是在目标组件的控制器中使用ActivtedRoute 来接收参数

```js
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
export class ProductComponent implements OnInit {

  //声明一个属性来接收路由传过来的id
  private productId:number
  constructor(private routeInfo:ActivatedRoute) { }

  ngOnInit() {
    this.productId = this.routeInfo.snapshot.queryParams["id"]
  }
}
```
在目标组件的模板中就可以使用接收到的id了

```html
<h4>商品的id是:{{productId}}</h4>
```



#### 3.7.2 在URL中传递参数

http://localhost:4200/product/1 

2.1 修改路由配置中的path属性,使其可以传递参数:

```JS
{path:'product/:id',component:ProductComponent}
```

2.2 修改路由链接的参数,来传递数据:

```HTML
<a [routerLink]="['/product', 1]">跳转到商品页</a>
```

2. 3在目标组件中的ts文件中获取参数:


```js
export class ProductComponent implements OnInit {
    private productId:number;
    constructor(private routeInfo: ActivatedRoute){}
	OnInit(){
    	this.productId = this.routeInfo.snapshot.params["id"]
	}
}
```



#### 3.7.3 在路由配置中传递数据:



```




```

### 3.8 参数快照和参数订阅

#### 参数快照

```js
//之前获取参数的方法:
OnInit(){
	this.productId = this.routeInfo.snapshot.params["id"]
}
```

页面上有两个可以跳转到商品页面的链接,一个传递参数1,一个传递参数2

但是当从主页跳转到1的页面的时候,组件的OnInit方法就会被调用,此时获取到商品的id为1,再从id为1的商品页跳转到id为2的商品页时,由于是同一个组件,组件不会被再次创建,所以OnInit方法不会被调用,获取到的id还是第一次的id,这就是通过this.routeInfo.snapshot.params["id"] 方法获取的id , 就是参数快照

解决上面这个问题的方法就是使用参数订阅

#### 参数订阅

```js
ngOnInit() {
    //参数订阅
    this.routeInfo.params.subscribe((params:Params)=>this.productId = params["id"])
}
```



### 3.9重定向路由 

在用户访问一个特定的地址的时候, 将其重定向到另一个指定的地址
在配置路由时,配置一下重定向路由:

```js
 {path : '' , redirectTo : 'home' , pathMatch : 'full'}
```

   

### 3.10 子路由



```js
//路由配置
{path:'product/:id',component:ProductComponent,children:[
        {path:'',component:ProductDescComponent},
        {path:'seller/:id',component:SellerInfoComponent}
	]
}
```

页面模板:

```html
<!-- 这里的路由不能再使用 / 了,这是指向根路由,应该使用相对路径 ./ 就是指向父路由 -->
<a [routerLink]="['./']">商品描述</a>
<a [routerLink]="['./seller',99]">销售员信息</a>
<router-outlet></router-outlet>
```

以上路由配置表示: 当访问 'localhost:4200/product/1'这个路由时,展示 ProductComponent 组件时,并且会在 ProductComponent组件中的 `<router-outlet>`这个占位符中展示 ProductDescComponent这个组件,当访问 'localhost:4200/product/1/seller/99'  这个路由的时候,依然会展示 ProductComponent 这个组件,然后在组件中的 `<router-outlet>`这个占位符中展示 SellerInfoComponent 这个组件

2.页面上跳转路由:
在父组件中添加两个跳转链接:
<a [routerLink]="['./']">商品描述</a>
<a [routerLink]="['./seller',9]">销售员信息</a>
注意: 这里跳转的地址,必能直接写 / 这表示根路径,要想访问到一个路由下的子路由
,要使用相对路径, './'表示访问当前这个html文件对应的路由

### 3.11 辅助路由

```js
<router-outlet></router-outlet>		---主插座
<router-outlet name="aux"></router-outlet>	---辅助插座
```

```js
{path : 'xxx' , component : XxxComponent , outlet : "aux"}  
//outlet指定当前这个组件要显示在哪个插座上,要显示在 aux这个插座上
{path : 'yyy' , component : YyyComponent , outlet : "aux"}

```

```html
<a [oruterLink]="['/home' , {outlets:{aux:'xxx'}}]">Xxx</a>
<a [oruterLink]="['/product' , {outlets:{aux:'yyy'}}]">Yyy</a>
```



表示: 当点击 Xxx 时,主插座会导航到 home这个组件上去, 但是辅助插座会显示 XxxComponent 这个组件

案例:实现在竞拍案例中每个页面上都有聊天这个组件

点击开始聊天时,地址栏上会显示 : localhost:4200/product/1(aux:chat) , 在页面上的辅助插座上会展示chat这个组件 ; 当点击结束聊天时,辅助路由上什么都不展示; 这个辅助路由的切换与其他根路由的切换没有关系,哪怕是由home切换到product , 聊天组件还是没有变化1.在app组件的模板上再定义一个插座来显示聊天面板
2.单独开发一个聊天组件,只显示在新定义的插座上
3.通过路由参数来控制新插座是否显示聊天面板

```js
{path : 'chat' , component : ChatComponent , outlet : "aux"}  
//这里的 outlet : "aux" 表示,这个组件要显示在 name属性为 aux 的插座上
```

模板上:

```html
<!-- 辅助路由的路由链接 -->
<!-- 需求:当点击开始聊天的时候,主插座不管显示的是哪个组件,都让它显示首页组件 -->
<a [routerLink]="[{outlets:{primary:'home', aux:'chat'}}]">开始聊天</a>
<a [routerLink]="[{outlets:{aux:null}}]">结束聊天</a>
<router-outlet></router-outlet>
<!-- 声明一个辅助路由 -->
<router-outlet name="aux"></router-outlet>
```



## 4 路由守卫:

使用场景:只有在满足某些条件后才能进入或者离开某些路由

+ 只有当用户已经登录并拥有某些权限时,才能进入某些路由
+ 一个由多个表单组件组成的向导,例如注册流程,用户只有在当前路由的组件中填写了满足条件要求的信息才可以导航到下一个路由

+ 当用户未执行保存操作而试图离开当前导航时提醒用户

三种路由守卫:

#### CanActivate 

CanActivate : 进入到某个路由之前的判断,处理导航到某路由的情况,当你不能满足要求时,就不能导航到这个路由

需求:只有登录过的用户才能访问product路由

1.1.先声明一个登录守卫: 在app文件夹中新建一个文件夹 guard,里面创建一个文件 login.guard.ts , 在此文件中生成一个随机数,如果小于0.5,就判定已登录

```js
import {CanActivate} from "@angular/router"
export class LoginGuard implements CanActivate {
  canActivate (){
	let loggedIn : boolean = Math.random() < 0.5
	if(!loggedIn) {
    	console.log("用户未登录")
	}
	return loggedIn
  }
}

```

1.2.在配置路由信息时,进行路由守卫的配置

```js
import { LoginGuard } from './guard/login.guard';
{path : 'product' , component:ProductComponent , canActivate : [LoginGuard]}
```

注意: canActivate : 在进入这个路由之前,判断是否登录,是一个数组,可以写多个守卫,依次判断

1.3.还要依赖注入,在app.routing.module.ts文件中的@NgModule方法中的providers数组中加入 一项 LoginGuard

```js
providers:[LoginGuard]
```

#### CanDeactivate 

CanDeactivate : 处理从当前路由离开的情况 , 当你不能满足要求时,就不能离开这个路由

需求:从product组建离开时,要先保存,不然提醒用户保存
2.1.在guard,里面创建一个文件 unsaved.guard.ts , 在此文件中提醒用户保存

```js
import {CanDeactivate} from "@angular/router"
import {ProductComponent} from "../product/product.component"
export class UnsavedGuard implements CanDeactivate<ProductComponent> {
  CanDeactivate (component : ProductComponent){
	return window.confirm("您还没有保存,确定要离开吗?")
  }
}
```

2.2.在配置路由信息时,进行路由守卫的配置

```js
{path : 'product' , component:ProductComponent , canActivate : [LoginGuard] , CanDeactivate : [UnsavedGuard]}
```

2.3.还要依赖注入,在app.routing.module.ts文件中的@NgModule方法中的providers数组中加入 一项 UnsavedGuard

```js
providers:[LoginGuard , UnsavedGuard]
```

#### Resolve 

Resolve : 在路由激活之前获取路由参数 , 这样可以一进入路由,就获取到路由参数,展示给用户比如说:要进入商品详情页时,要先获取携带过来的路由参数,在 OnInit钩子中发送请求,获取数据,但是在得到数据之前,页面上用插值表达式的地方都是空的,这个不太好,所以就用 Resolve 守卫,使其在进入此路由之前就发送请求获取数据,带着这些数据进入到路由里面,这样的话,用户一进入路由,立马就能看到数据了,如果resolve没有按到数据,就提示错误信息,或者跳转到其他的页面

3.1.在guard,里面创建一个文件 unsaved.guard.ts , 在此文件中提醒用户保存

```js
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Product } from '../product/product.component';
import { Observable } from 'rxjs';
@injectable()  //这里需要一个装饰器,只有这个装饰器,才能让router这个类注入进来
export class ProductResolve implements Resolve<Product> {
    constructor(private router :Router){}
    resolve (route : ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Product>|Promise<Product>|Product{
		let productId:number = route.params["id"]
		if(productId == 1){  //如果id为1,就是正确的id,这里就不去真的发请求了
    		//满足要求就返回一个数据对象 new Product(1,"iPhone7") 之后在 product组件中接收这两个数据
 			return new Product(1,"iPhone7")
 		} else {
    		this.router.navigate(['/home'])
    	return undefined
		}
	}
}
```

3.2 在product.component.ts文件中接收 productResolve 传递过来的数据

```js
export class ProductComponent implements OnInit {

  //声明一个属性来接收路由传过来的id
  private productId:number

  //resolve 路由守卫需要的两个数据,一个是上面的productId
  private productName:string
  constructor(private routeInfo:ActivatedRoute) { }

  ngOnInit() {
    // this.productId = this.routeInfo.snapshot.queryParams["id"]
    //参数快照
    // this.productId = this.routeInfo.snapshot.params["id"]
    //参数订阅
    this.routeInfo.params.subscribe((params:Params)=>this.productId = params["id"])
    //resolve路由守卫获取productId , productName
    this.routeInfo.data.subscribe((data:{product:Product})=>{
      this.productId = data.product.id
      this.productName = data.product.name
    })
  }
}

//productResolve 路由守卫中要用到的商品数据的类
export class Product {
  constructor(public id:number , public name:string){

  }
}
```

3.3.在配置路由信息时,进行路由守卫的配置

```js
{path : 'product' , component:ProductComponent , resolve : {product : ProductResolve}}
```

3.4.还要依赖注入,在app.routing.module.ts文件中的@NgModule方法中的providers数组中加入 一项 ProductResolve

```js
providers:[ProductResolve]
```

3.5 在product.component.ts文件中获取到这个数据

```js
OnInit(){
    this.routeInfo.data.subscribe((data:{product : Product}) => {
    	this.productId = data.product.id
		this.productName = data.product.name
    })
}
```

#### Acution 项目实战--使用路由实现点击跳转到商品详情组件

路由实战思路:

+ 创建商品详情组件,显示商品的图片和标题
+ 重构代码,把轮播图组件和商品列表组件封装进新的Home组件
+ 配置路由,在导航到商品详情组件时传递商品的标题参数
+ 修改App组件,根据路由显示Home组件或商品详情组件
+ 修改商品列表组件,给商品标题添加新的routeLink指令的链接,导航到商品详情路由

第一步:

```js
//创建商品详情组件,product-detail.component.ts:
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent implements OnInit {

  //商品详情组件需要商品标题和商品图片,这里的图片我们定死了,就声明一个商品标题就行
  productTitle:string
  //需要在router中获取到跳转过来时传递过来的参数
  constructor(private routeInfo:ActivatedRoute) { }

  ngOnInit() {
    //初始化商品详情数据
    this.productTitle = this.routeInfo.snapshot.params["productTitle"]
  }

}

```



```html
<!--product-detail.component.html:-->
<div>
  <img src="http://placehold.it/820x230" alt="">
  <h4>{{productTitle}}</h4>
</div>

```



第二步:完成home组件

```html
<!-- 创建home组件,将轮播图组件和商品列表组件放进来,再将css也粘过来 -->
<div class="row carousel-container">
  <app-carousel></app-carousel>
</div>
<div class="row">
  <app-product></app-product>
</div>

<!-- css -->
.carousel-container{
    margin-bottom: 20px;
}
```

第三步:自己创建路由

```js
//在app.module.ts文件中直接创建路由
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Routes } from '@angular/router';

const routeConfig:Routes = [
  { path:'',component:HomeComponent },
  { path:'product/:productTitle',component:ProductDetailComponent }
]

imports: [
    BrowserModule,
    //在主模块中要注入路由配置
    RouterModule.forRoot(routeConfig)
  ],
```



第四步:改造app.component.html

```html
<!-- 将原来app组件中的轮播图和商品列表组件都抽离放在home组件中去之后,在app组件原来的地方要放置一个插座,这样在路由导航的时候,根据路配置显示不同的组件 -->
<div class="col-md-9">
  <router-outlet></router-outlet>
</div>
```



第五步:增加路由链接

```html
<!-- 在商品列表模板里 -->
<h4><a href="#" [routerLink]="['/product',product.title]">{{product.title}}</a></h4>
      <p>{{product.desc}}</p>
```



## 5 依赖注入:

依赖注入: Denpendency Injection  简称 DI

实现控制反转的手段

控制反转: Inversion of Control 简称 IOC

是说:将依赖的控制权从代码的内部转为代码的外部

#### 依赖注入的松耦合和可重用

```js
//app.module.ts 
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig)
  ],
  //在angular中,需要指定providers来告诉angular哪些对象需要注入
  providers: [ProductService,
             ...省略其他配置],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
@Component({
    ...省略组件配置
})
export class ProductComponent{
    product : Product;
	constructor(productService:ProductService){
    	this.product = productService.getProduct()
	}
}
```



```js
providers: [ProductService]
//上面的这一行代码等价于 :
providers:[{provide:ProductService,useClass:ProductService}]
//token:一个token代表一个可被注入的对象的类型,token的类型用provide对象的provide属性提供
//上面这段代码的意思是:注册一个类型是ProductService的token , 当有组件声明自己需要一个类型为 ProductService 的token时,实例化一个 ProductService  ,并将其注入到目标对象
//那么组件如何声明自己需要一个类型为  ProductService 的token 呢?
//就是用它的构造函数:
constructor(productService:ProductService){
    
}
```

angular 看到这个构造函数就会去providers中去找 ProductService 这个类型的token 对应的类是哪个--useClass 的 ProductService , 然后实例化一个 ProductService注入到组件构造函数中,而组件本身不知道传进来的是 ProductService 的哪个实例 , 更不需要明确的去实例化这个 ProductService , 它主需要使用 angular为它创建好的这个对象 , 并调用 getProduct这个方法就好了 , 如果在其他项目中向重用这个组件,而哪个项目中有另一个实现了 ProductService 的类 , 那么你可以修改哪个项目的 app.module.ts中的 providers的声明:

```js
providers:[{provide:ProductService,useClass:AnotherProductService}]
```

当另一个项目中的组件需要 ProductService 类型的token 时,实例化一个 AnotherProductService 给这个组件的构造函数 , 但是复用的组件本身并不需要任何修改

以上就可以实现 依赖注入的第一个好处,就是松耦合和可重用

#### 依赖注入的可测性

当真实的对象还不可用时,你可以注入一个虚拟的对象来测试你的程序

## 6 数据绑定: 

将控制器和页面模板连接起来
注意:angular中的数据绑定是单向的,要么像1,2一样,将组件控制器中的属性变化反应
在模板上,要么像3一样,将模板上的事件绑定到组件控制器的方法上 ; 要想实现双向
绑定需要明确指定某个属性要双向绑定,它是可选项,而不是默认行为

1. 使用插值表达式将一个表达式的值显示在模板上,是DOM属性绑定
  <h1>{{productTitle}}</h1>
  注意:插值表达式其实和属性绑定是一样的,比如:
  <img src="{{imgUrl}}"/>  和  <img [src]="imgUrl"/>  效果是一样的
  最终angular会把插值表达式都翻译成属性绑定的形式去解析

2.使用方括号将HTML标签的一个属性绑定到一个表达式上
<img [src]="imgUrl"/>

3.使用小括号将组件控制器的一个方法绑定到模板上一个事件的处理器
<button (click)="toProductDetail($event)">商品详情</button>
事件绑定的等号右边不一定是一个函数调用,也可以是一个属性赋值,比如:
<button (click)="saved = true">商品详情</button>

### 元素的DOM属性和HTML属性:

元素的DOM属性是可以变化的,比如说表单的value属性,手动将表单中的内容改变之
后,value属性就改变了,
元素的HTML属性是不变的,是元素的初始值
doOnInpiut(event:any){
    console.log(event.target.value)	---获取的是DOM属性
    console.log(event.target.getAttribute("value"))   ---获取的是HTML属性
}

#### 元素的DOM属性和HTML属性的关系:

1.少量的HTML属性和DOM属性之间有着1:1的映射,如:id
2.有些HTML属性没有对应的DOM属性,如colspan
3.有些DOM属性没有对应的HTML属性,如 textCOntent
4.就算名字相同,HTML属性和DOM属性也不是同一个东西
5.HTML属性的值指定了初始值;DOM属性的值表示当前值;DOM属性的值可以改变;HTML属
性的值不能改变
6.模板绑定是通过DOM属性和事件工作的,而不是HTML属性

#### DOM属性绑定的过程:

<input [value]="greeting">
模板上的input元素的value属性的值是控制器中的greeting属性
1.当控制器中的greeting 的值改变的时候,angular会使用单向绑定机制来更新DOM
2.此时不会更新HTML属性
3.angular在更新了DOM的value属性之后,新的value值会被渲染到页面上
4.DOM的value属性的改变不会更新与其相关的input标签的HTML属性
5.当用户在input中输入内容的时候,浏览器也不会同步ui和HTML属性,用户看到的新值
是来自于DOM,而不是来自于HTML

#### HTML属性绑定:

基本的Html属性绑定: <td [attr.colspan]="tableColspan">Something</td>
我们优先使用DOM属性绑定,只有当我们没有DOM属性可以绑定的时候,我们就使用HTML
属性进行绑定

#### HTML属性绑定的过程:

<input [attr.value]="greeting">
1.当组件中的greeting属性改变的时候,angular的单向绑定机制会来更新HTML元素
2.在这个过程中,angular不更新DOM节点的属性
3.在这里,DOM获得了新的值,是因为浏览器同步了HTML元素和DOM对象
4.由于DOM属性改变;了,所以会使得ui和用户看到的界面都发生改变

### CSS类绑定:

 <div class="aaa bbb" [class]="someExpression">something</div>
	   [class]="someExpression" 这一项会把标签中的class样式全部替换

	   <div [class.special]="isSpecial">something</div>
	   这是管理一个类名,只添加某一个类名,不影响其他的固定的类名的样式
	
	   <div [ngClass]="{aaa:isA , bbb:isB}">something</div>
	   使用ngClass管理多个类名,isA为true,就绑定aaa这个类名

样式绑定: 1.设置一个内联样式
	  <button [style.color]="isSpecial ? 'red':'green'">Red</button>
	  如果绑定的样式有单位:就在样式后面.上单位
	  <button [style.font-size.px]="isSpecial ? 20:60">Red</button>
	  2. 设置多个内联样式
	  <div [ngStyle]="{'font-style':this.canSave ? 
'italic':'normal'}">something</div>

### 双向绑定:

事件绑定是从模板到控制器,属性绑定是从控制器到模板,组合起来就可以实现双向数
据绑定
<input [value]="name" (input)="doOnInput($event)"> {{name}}
使用 [value]属性绑定使控制器中的数据同步到页面上,使用(input)事件绑定,当页面
表单内容发生变化时,触发事件,获取改变后的值,给控制器里的name属性重新赋值,实
现视图层数据变化驱动数据层的数据改变
angular提供了ngModel属性,实现双向数据绑定,语法是:<input [(ngModel)]="name">
ngModel用在input标签上,驱动的是input事件,当ngModel用在其他标签上的时候,驱动
的事件也不同,但是用来其他的标签上也没什么用,其他的标签都是用来展示用的标签,
不需要与用户进行互动
这里与vue不同;vue中的v-model双向数据绑定只能用在 input , textarea , select 
标签上,就是绑定的value属性

## 7 响应式编程: 

需要在app.module.ts文件中的imports中引入一个模块: ReactiveFormsModule
在控制器中声明一个 titleFilter
private titleFilter:FormControl = new FormControl()
在页面上将titleFilter字段与变淡进行绑定:
<input [formCOntrol]="titleFilter"/>
当input里面的值发生改变的时候,titleFilter就会往外发射valueChanges事件,我们
要做的就是订阅这个事件,然后保存这个值
在组件的ts文件中订阅这个字段:
debounceTime(500)  是为了增强忧患体验,在用户在持续输入的时候,不要对外发射映
射,需要它起作用,需要在上面导入 'rxjs/Rx'
import 'rxjs/Rx'
constructor(private productService:ProductService){
  this.titleFilter.valueChanges.debounceTime(500).subscribe(
    //将改变后的value值赋值给定义好的keyword属性
    value => this.keyword = value
  )
}

## 8 指令

appModule中的 declarations  数组只能接受可声明对象。可声明对象包括组件、[指令](https://www.angular.cn/guide/attribute-directives)和[管道](https://www.angular.cn/guide/pipes)。 一个模块的所有可声明对象都必须放在  declarations 数组中。 可声明对象必须只能属于一个模块，如果同一个类被声明在了多个模块中，编译器就会报错。 

### 8.1 组件

组件 — 拥有模板的指令

### 8.2 结构型指令

结构型指令 — 通过添加和移除 DOM 元素改变 DOM 布局的指令,每个宿主元素上只能有一个结构型指令

#### 8.2.1 内置结构型指令

三个常用的内置结构型指令 —— [NgIf](https://www.angular.cn/guide/template-syntax#ngIf)、[NgFor](https://www.angular.cn/guide/template-syntax#ngFor)和[NgSwitch.](https://www.angular.cn/guide/template-syntax#ngSwitch) 

```html
<div *ngIf="hero" class="name">{{hero.name}}</div>

<ul>
  <li *ngFor="let hero of heroes">{{hero.name}}</li>
</ul>

<div [ngSwitch]="hero?.emotion">
  <app-happy-hero    *ngSwitchCase="'happy'"    [hero]="hero"></app-happy-hero>
  <app-sad-hero      *ngSwitchCase="'sad'"      [hero]="hero"></app-sad-hero>
  <app-confused-hero *ngSwitchCase="'confused'" [hero]="hero"></app-confused-hero>
  <app-unknown-hero  *ngSwitchDefault           [hero]="hero"></app-unknown-hero>
</div>
```

##### 星号（*）前缀

```html
<div *ngIf="hero" class="name">{{hero.name}}</div>
```

星号是一个用来简化更复杂语法的“语法糖”。 从内部实现来说，Angular 把 `*ngIf` *属性* 翻译成一个 `<ng-template>` *元素* 并用它来包裹宿主元素，代码如下： 

```html
<ng-template [ngIf]="hero">
  <div class="name">{{hero.name}}</div>
</ng-template>
```



#### 8.2.2 自定义指令

指令同时具有两种拼写形式: 大驼峰 UpperCamelCase 和小驼峰 lowerCamelCase，比如你已经看过的 NgIf 和 ngIf。 这里的原因在于，NgIf 引用的是指令的*类名*，而 ngIf 引用的是指令的*属性名*。

指令的*类名*拼写成*大驼峰形式*（`NgIf`），而它的*属性名*则拼写成*小驼峰形式*（`ngIf`）。 本章会在谈论指令的属性和工作原理时引用指令的*类名*，在描述如何在 HTML 模板中把该指令应用到元素时，引用指令的*属性名*。

##### `<ng-template>`

`<ng-template>`是一个 Angular 元素，用来渲染 HTML。 它永远不会直接显示出来。 事实上，在渲染视图之前，Angular 会把 `<ng-template>`及其内容*替换为*一个注释。

如果没有使用结构型指令，而仅仅把一些别的元素包装进 `<ng-template>` 中，那些元素就是不可见的

##### `<ng-container>`

使用`<ng-container>`把一些兄弟元素归为一组

通常都需要一个*根*元素作为结构型指令的宿主。 列表元素（`<li>`）就是一个典型的供 `NgFor` 使用的宿主元素。 

当没有这样一个单一的宿主元素时，你就可以把这些内容包裹在一个原生的 HTML 容器元素中，如 `<div>`，并且把结构型指令附加到这个"包裹"上。 

但是，`<select>` 元素要求直属下级必须为 `<option>`，那就没办法把这些选项包进 `<div>` 或 `<span>` 中。

 

```html
<div>
  Pick your favorite hero
  (<label><input type="checkbox" checked (change)="showSad = !showSad">show sad</label>)
</div>
<select [(ngModel)]="hero">
  <ng-container *ngFor="let h of heroes">
    <ng-container *ngIf="showSad || h.emotion !== 'sad'">
      <option [ngValue]="h">{{h.name}} ({{h.emotion}})</option>
    </ng-container>
  </ng-container>
</select>
```

页面效果如下:

![](E:\angular\image\select-ngcontainer-anim.gif)

##### 写 `UnlessDirective` 结构型指令 

它是 `NgIf` 的反义词。 `NgIf` 在条件为 `true` 的时候显示模板内容，而 `UnlessDirective` 则会在条件为 `false` 时显示模板内容。 

```js
ng generate directive UnlessDirective  //创建指令类文件,
```

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 */
@Directive({ selector: '[appUnless]'})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

该指令的*属性名*应该拼写成*小驼峰*形式，并且带有一个前缀。 但是，这个前缀不能用 `ng`，因为它只属于 Angular 本身。 请选择一些简短的，适合你自己或公司的前缀。 在这个例子中，前缀是 `app`。 

结构型指令会从 Angular 生成的 `<ng-template>` 元素中创建一个[*内嵌的视图*](https://www.angular.cn/api/core/EmbeddedViewRef)，并把这个视图插入到一个[*视图容器*](https://www.angular.cn/api/core/ViewContainerRef)中，紧挨着本指令原来的宿主元素 `<p>`（译注：注意不是子节点，而是兄弟节点） 

你可以使用[`TemplateRef`](https://www.angular.cn/api/core/TemplateRef)取得 `<ng-template>` 的内容，并通过[`ViewContainerRef`](https://www.angular.cn/api/core/ViewContainerRef)来访问这个*视图容器* 

该指令的使用者会把一个 true/false 条件绑定到 `[appUnless]` 属性上。 也就是说，该指令需要一个带有 `@Input` 的 `appUnless` 属性 

一旦该值的条件发生了变化，Angular 就会去设置 `appUnless` 属性。因为不能用 `appUnless` 属性，所以你要为它定义一个设置器（setter）。

- 如果条件为假，并且以前尚未创建过该视图，就告诉*视图容器（ViewContainer）*根据模板创建一个*内嵌视图*。
- 如果条件为真，并且视图已经显示出来了，就会清除该容器，并销毁该视图。

没有人会读取 `appUnless` 属性，因此它不需要定义 getter。

使用该指令:

```html
<p *appUnless="condition" class="unless a">
  (A) This paragraph is displayed because the condition is false.
</p>

<p *appUnless="!condition" class="unless b">
  (B) Although the condition is true,
  this paragraph is displayed because appUnless is set to false.
</p>
```



### 8.3 属性型指令

属性型指令 — 改变元素、组件或其它指令的外观和行为的指令,例如，内置的 NgStyle 指令可以同时修改元素的多个样式。

#### 8.3.1 创建一个简单的属性型指令

当用户把鼠标悬停在一个元素上时，改变它的背景色

```js
ng generate directive appHighlight //创建指令类文件,
```

和**组件**一样，这些**指令**也必须在[Angular 模块](https://www.angular.cn/guide/ngmodules)中进行声明。 

```js
import { Directive, ElementRef } from '@angular/core';

//@Directive 装饰器的配置属性中指定了该指令的 CSS 属性型选择器 [appHighlight]
//这里的方括号([])表示它的属性型选择器。 Angular 会在模板中定位每个拥有名叫 appHighlight 属性的元素，并且为这些元素加上本指令的逻辑。

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
    constructor(el: ElementRef) {  
        //ElementRef 通过其 nativeElement 属性给你了直接访问宿主 DOM 元素的能力。
       el.nativeElement.style.backgroundColor = 'yellow';
    }
}
```

使用该指令

```html
<p appHighlight>Highlight me!</p>
```

#### 8.3.2 响应用户引发的事件

这个指令应该在用户鼠标悬浮一个元素时，设置它的颜色。 

@HostListener  装饰器让你订阅某个属性型指令所在的宿主 DOM 元素的事件，在这个例子中就是 `<p>`。 

```js
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

#### 8.3.3 使用 `@Input` 数据绑定向指令传递值

在 `@Input` 的参数中把该选择器指定为别名。 

```js
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @Input('appHighlight') highlightColor: string;  //在指令内部，该属性叫 highlightColor，在外部，在其它地方，它叫 appHighlight。

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

使用该指令:

```html
<h1>My First Attribute Directive</h1>

<h4>Pick a highlight color</h4>
<div>
  <input type="radio" name="colors" (click)="color='lightgreen'">Green
  <input type="radio" name="colors" (click)="color='yellow'">Yellow
  <input type="radio" name="colors" (click)="color='cyan'">Cyan
</div>
<p [appHighlight]="color">Highlight me!</p>
```

#### 8.3.4 给指令绑定第二个属性

把第二个名叫  defaultColor 的**输入**属性添加到  HighlightDirective 中： 

修改该指令的 onMouseEnter，让它首先尝试使用 highlightColor 进行高亮，然后用 defaultColor，如果它们都没有指定，那就用红色作为后备。 

在 8.3.3 的基础上新增和修改:

```js
@Input() defaultColor: string;  //新增
```

```js
@HostListener('mouseenter') onMouseEnter() {  //修改
  this.highlight(this.highlightColor || this.defaultColor || 'red');
}
```

使用时:

```html
<p [appHighlight]="color" defaultColor="violet">
  Highlight me too!
</p>
```

Angular 之所以知道 defaultColor 绑定属于 HighlightDirective，是因为你已经通过 @Input 装饰器把它设置成了*公共*属性。 

## 8 管道  

将数据作为输入,将其转化,再输出,我们将输出后的数据展示在页面上,与vue中的过滤
器的作用一致,用得最多的场景就是转化时间格式,管道符也同样可以设置多个,最后的
结果为输出结果

```html
<p>我的生日:{{birthday | date | uppercase}}</p>
```

### angular中内置管道

+ date : 将时间格式转化为 Feb 5,2017 这样的格式

​     date 这个管道符后面还可以接一个指定的格式:

```html
 <p>我的生日:{{birthday | date:'yyyy-MM-dd HH:mm:ss'}}</p> 
<!--HH表示24小时制.如果是 hh 表示12小时制 -->
```

+ uppercase : 将字母全都变为大写字母
+ lowercase : 将字母全都变为小写字母
+ number:'2.2-2' : 格式化数字用的,这里是指将数字保留两位小数,第一个2表示整数位显示几位数,这里是显示到十位,如果是小于10的数字,前面自动补零,后面的2-2表示最少显示2位小数,最多显示2位小数
+ async : 异步管道,处理异步的流

### 自定义管道

自定义管道: 在项目终端输入 ng g pipe pipe/multiple
使用命令行的时候,angular自动帮我们将管道加入到了 app.module.ts文件的declarations中了,如果是我们手动添加自定义管道,记得自己要手动添加

在multiple.pipe.ts文件中:

```js
import {Pipe , PipeTransform } from '@angular/core'
@Pipe({
  name : 'multiple'  //管道符的名字
})
export class MultiplePipe implements PipeTransform {
  transform(value : number , args? : number):any {
    if(!args){
	//如果可选参数不存在,就给一个值	
	args = 1
    }
    return value * args
  }
}
```


PipeTransform 是接口,这个接口中只有一个方法 transform ,value是传入的原始值 ,  args是可选参数,比如说date后面的'yyyy-MM-dd HH:mm:ss' 就可以作为可选参数

需求:在表单中输入关键字,对下面的商品列表进行筛选

```js
//1.先设置管道过滤器
ng g pipe pipe/filter
//在filter.pipe.ts文件中写代码:
@Pipe({
  name : 'filter'  //管道符的名字
})
export class FilterPipe implements PipeTransform {
  transform(list: any[] , filterField : string , keyword : string):any {
    if(!filterField || !keyword){
		//如果可选参数有一个没有传值,就直接原样返回
		return list
    }
    return list.filter(item => {
	//filterValue 是传入的参数,根据什么进行过滤,如果是商品名称,就将每一项商品的名称取出来,看名称中是否包含关键词字段,如果包含,返回true,如果不包含,返回false , filter这个方法会将数组进行过滤,返回一个满足条件的新数组
        let filterValue = item[filterField]
		return fieldValue.indexOf(keyword) >=0
    })
  }
}
```



```html
<!--2.在组件的html文件中将数据进行循环渲染列表之前,先将商品列表数据先进行过滤 -->
<div *ngFor="let product of products | filter:'title':keyword"> </div>
```



## 9 组件中的通讯

实现松耦合的组件,就是组件之间没有关联,复用性高

### 9.1 组件的输入输出属性--父子组件的传值

#### 1.1输入属性: @Input()

组件的输入属性是被@Input装饰器注解的属性,用来从父组件接收数据,如果父组件中的数据改变,那么应用了该数据的子组件的数据也会自动改变,但是当我们手动改变了子组件的数据,父组件的数据没有被改变,说明@Input输入属性是单向的

在子组件中:

```js
export class StarsComponent implements OnInit {
  //显示五颗星星,需要一个含有五个元素的数组
  private stars:boolean[];
  //需要商品组件中的星级评价数据,要从父组件中接收数据
  @Input()
  private rating:number = 0
  constructor() { }
  ngOnInit() {
    this.stars = []
    for(let i = 1; i <= 5; i++){
      //如果某个商品的rating为3.5 那么这个商品的stars数组就是[false,false,false,true,true],就是前三个实心,后两个空心
      this.stars.push(i > this.rating)
    }
  }
}
```

在父组件中:

```html
<!-- 表示app-star组件中的rating属性的数据应该是当前组件的product.rating属性传递过去的 -->
<app-stars [rating]="product.rating"></app-stars>
```



##### 输入属性和路由参数的区别

输入属性只能应用在父子组件之间,进行传值
路由参数是要在组件中依赖注入路由对象,通过参数快照或者是参数订阅来获取参数
以上就是我们现在学到的两种向组件传值的方法

#### 1.2 输出属性: @Output()

输出属性是将子组件中的数据传递到父组件中

使用@Output装饰器注解的属性,就可以 emit 一个值出去
@Output()
lastPrice:EventEmitter<PriceQuote> = new EventEmitter()  
上面的泛型<PriceQuote>是指你想发射出去的数据时什么类型的
在控制器中:
this.lastPrice.emit(priceQuote)  用emit去往外发射事件的时候,发射的就是这个
泛型指定的这个类型的数据
现在需要在它的父组件中捕捉子组件发射出来的事件,使用事件绑定的方式,
现在子组件的标签上使用事件绑定: <app-price-quote (lastPrice)
="priceQuoteHandle($event)">
然后在父组件中定义一个priceQuoteHandle方法,这个方法要接收一个event,这个
event的类型是子组件发射出来的数据的类型
priceQuoteHandle(event:PriceQuote){ this.priceQuote = event}
注意:可以在@Output()的括号中指定捕获的事件名字,没有写的话,就默认是你注释的
属性的名字 lastPrice

### 9.2 使用中间人模式传递数据

中间人就是这两个兄弟组件的共同的父组件,最大的中间人就是app.component 
一个组件中的数据发生变化,就先通知他的父组件,然后由父组件再去通知另一个他里面的子组件,比如:
A组件中有两个子组件 b ,c ; b组件中有数据改变,要传递给c组件
2.1通过事件绑定,把b组件的改变发射给A父组件,然后A组件使用属性绑定的方式将获
取到的数据将值传递给c组件

但是如果两个组件没有共同的父组件或者是两个组件没有在同一时刻显示怎么办?
这个时候需要一个服务作为中间人

1.一个组件将数据发射出去

```html
//price.component.html
<div style="border-top: 1px solid #000">
  <h2>这里是价格组件</h2>
  <div>
    商品id:{{id}}
    商品价格：{{price|number:'2.2-2'}}
  </div>
  <button (click)="buyNow($event)">立即购买</button>
</div>

```

```js
//price.component.ts
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  id: string = 'product1';
  price: number;

  @Output()
  buy: EventEmitter<PriceRandom> = new EventEmitter();

//EventEmitter后面的<PriceRandom>这个范型代表的是发射出去值的类型，这里是PriceRandom
  constructor() {
    setInterval(() => {
      let priceRandom: PriceRandom = new PriceRandom(this.id, 100 * Math.random());
      this.price = priceRandom.lastPrice;
    }, 2000);
  }

  ngOnInit() {
  }

  buyNow(event) {
    this.buy.emit(new PriceRandom(this.id, this.price));
  }

}

export class PriceRandom {
  constructor(public id: string,
              public lastPrice: number) {
  }
}
```

2.根组件来接收数据

```html
//app.component.html
<h1>
  我是主组件
</h1>
<!--价格组件 start-->
<app-price (buy)="buyHandle($event)"></app-price>
<!--价格组件 end-->
<!--订单组件 start-->
<app-order [nowPrice]="price"></app-order>
```

```js
//app.component.ts
import {Component} from '@angular/core';
import {PriceRandom} from './price/price.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  price: PriceRandom = new PriceRandom('', 0);

  buyHandle(event: PriceRandom) {
    this.price = event;
  }
}

```

3.另一个组件接收跟组件传入的数据

```html
//order.component.html
<h2>
  我是订单组件
</h2>
<h4>
  点击购买时的商品价格为：{{nowPrice.lastPrice}}
</h4>
```

```js
//order.component.ts
import {Component, Input, OnInit} from '@angular/core';
import {PriceRandom} from '../price/price.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input()
  nowPrice: PriceRandom;

  constructor() {
  }

  ngOnInit() {
  }

}
```



### 9.3 快速获取DOM元素进行增删改查

#### 9.3.1  ElementRef 获取DOM元素



```html
<!-- 子组件中 -->
<div style="width:100px;height:100px;border:1px solid red" class="btn1">按钮一</div>
<p>了解ElementRef</p>
```

```js
import { ElementRef} from '@angular/core';
constructor( private el:ElementRef){}
  ngOnInit(){
    console.log(this.el.nativeElement);
    this.el.nativeElement.querySelector('.btn1').style.height = '300px';

}
```

可以看到nativeElement其实包含的是组件中所有的DOM元素。如果想获取页面某个元素，可以使用querySelector获取某个元素或者querySelectorAll获取多个元素。

但是我们要尽量减少应用层与渲染层之间强耦合关系，从而让我们应用能够灵活地运行在不同环境。怎么做了？我们需要renderer2

#### 9.3.2 使用renderer2获取DOM元素

```html

<div style="width:100px;height:100px;border:1px solid red" class="btn1">按钮一</div>
<p>了解ElementRef</p>
```

```js
import {ElementRef,OnInit,Renderer2} from '@angular/core';
constructor( 
    private el:ElementRef,
    private renderer2: Renderer2){}
ngOnInit(){
    console.log(this.el.nativeElement);
    //this.el.nativeElement.querySelector('.btn1').style.height = '300px';
    this.renderer2.setStyle(this.el.nativeElement.querySelector('.btn1'),
    		'background','green')
}
```

关于Renderer2的更多API： 

```js
abstract class Renderer2 {
  abstract get data: {...}
  destroyNode: ((node: any) => void) | null
  abstract destroy(): void
  abstract createElement(name: string, namespace?: string | null): any
  abstract createComment(value: string): any
  abstract createText(value: string): any
  abstract appendChild(parent: any, newChild: any): void
  abstract insertBefore(parent: any, newChild: any, refChild: any): void
  abstract removeChild(parent: any, oldChild: any): void
  abstract selectRootElement(selectorOrNode: string | any): any
  abstract parentNode(node: any): any
  abstract nextSibling(node: any): any
  abstract setAttribute(el: any, name: string, value: string, namespace?: string | null): void
  abstract removeAttribute(el: any, name: string, namespace?: string | null): void
  abstract addClass(el: any, name: string): void
  abstract removeClass(el: any, name: string): void
  abstract setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void
  abstract removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void
  abstract setProperty(el: any, name: string, value: any): void
  abstract setValue(node: any, value: string): void
  abstract listen(target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any) => boolean | void): () => void
}
```



#### 9.3.3 @ViewChild(属性装饰器) --父组件调用子组件的数据

可以使用ViewChild从视图DOM中获取匹配选择器的第一个元素或指令。如果视图DOM发生变化，并且新的子项与选择器匹配，则属性将被更新。在ngAfterViewInit调用回调之前设置。 

```html
<div style="width:100px;height:100px;border:1px solid red" class="btn1">按钮一</div>
<!--模板变量名-->
<div style="width:100px;height:100px;" #div3>按钮三</div>
<p>了解ElementRef</p>
```

```js
import { ElementRef,OnInit,Renderer2,ViewChild} from '@angular/core';
@ViewChild('div3') div3:ElementRef;
  constructor( 
    private el:ElementRef,
    private renderer2: Renderer2){}
  ngOnInit(){
    console.log(this.el.nativeElement);
    //this.el.nativeElement.querySelector('.btn1').style.height = '300px';
    this.renderer2.setStyle(this.el.nativeElement.querySelector('.btn1'),'background','green');
    console.log('ViewChild获取匹配的元素:')
    console.log(this.div3.nativeElement);
    this.renderer2.setStyle(this.div3.nativeElement,'background','red');
  }
```



## 10 组件的生命周期

```js
//这个顺序是按照执行的先后排列的
//初始化属性
constructor：实例化对象,构造器函数，一般用于注入服务
ngOnChanges：初始化输入属性 , 检测到输入数据变化，首次触发发生在ngOnInit前。注意对象的属性发生变化时监听不到
ngOnInit：初始化除了输入属性之外的其他属性,组件初始化，通常会设置一些初始值
ngDoCheck：手动触发更新检查 , 到了这一步,所有的组件的属性都被赋予了应该赋予的值
//初始化视图
ngAfterContentInit：从这个钩子开始,组件开始渲染视图,这个钩子是投影进来的内容初始化到组件之后
ngAfterContentChecked：投影进来的内容变更检测之后,注意,如果组件中海油子组件,就将子组件又从头到尾运行所有的生命周期
ngAfterViewInit：视图 初始化之后
ngAfterViewChecked：视图发生变化检测之后，这个可以用来保证用户视图的及时更新 , 到了这一步,组件就可以展示给用户看到了,并与用户进行交互
ngOnDestroy：组件注销时的清理工作，通常用于移除事件监听，退订可观察对象等,当跳转路由的时候,离开的那个组件会被销毁

//与用户交互,只要发生了点击,键盘输入,就会触发nagular的变更检测机制,一旦检测到发生了变更,在当前组件树上,所有活动组件树上的带有check关键字的方法都会被调用,用来检查当前组价的一些变化,如果当前的变化导致了某个组件的输入属性也改变了,那么那个组件的 ngOnChanges钩子也会被触发
```

### ngOnChanges生命周期

- 在父组件初始化或修改子组件的**输入参数**时调用。

但是只有当输入属性是不可变对象的时候,值改变了,才会触发此钩子;如果输入属性是可变对象,就算值改变了,也不会调用此钩子

可变对象和不可变对象:

像是javascript中的字符串,就是不可变对象,声明一个字符串变量 var msg = "hello",然后重新对他进行赋值 msg = "hello world",这两个字符串在内存中都存在,不可变,变化的是msg变量指向了不同的内存地址,这就是不可变对象

再比如javascript中的对象, var user = {name : "jack"},再改变对象的属性, user.name = "lili" , 但是user这个对象从始至终还是指向的同一个内存,只是其中的属性变了,这就是可变对象

### ngDoCheck生命周期

+ 在输入属性为可变对象的时候,在ngDoCheck生命周期中可以检测到数据的变化,但是其他任何可能会改变页面的操作都可能会触发此事件,所以该事件会被频繁触发,有性能问题,必须要高效使用

只要生命周期钩子的名字中带有 check 这个单词的,就是组件发生变更的时候一定会调用的,所以使用这些生命周期的时候必须轻量高效

+ ngAfterViewInit：视图 初始化之后
+ ngAfterViewChecked：视图发生变化检测之后，这个可以用来保证用户视图的及时更新

上面的两个钩子是ngAfterViewInit 先触发 , ngAfterViewChecked后触发 , 而且如果是在父组件中,是父组件中的所有子组件的视图和变更检测都更新完毕之后,才会触发父组件中的这两个钩子

注意:在ngAfterViewInit 和 ngAfterViewChecked 这两个钩子中不要再去改变视图中的值,会抛出错误,可以放在定时器中执行





## 11 angular的变更机制

angular的变更机制是由 zone.js实现的,它的作用是保障组件的属性的变化和页面上的变化是同步的,浏览器的任何异步事件都会触发变更检测,会将组件属性的变化反应在模板上,而不会主动去改变组件中属性的值
变更检测有两个策略:

+ Default策略: 如果所有的组件都使用Default策略,那么不管变更发生在哪个组件上,zone.js都会检查整个组件树,如果遇到有组件使用OnPush策略,就会跳过这个组件,继续检查其他组件
+ OnPush策略: 如果有一个特定的组件声明自己是使用OnPush策略,那么只有当这个组件的输入属性发生变化的时候,zone.js才会检测这个组件及其子组件

## 12 投影

投影:就是将父组件中的任意片段投影到子组件中展示出来

需求:在子组件的头部和尾部都是父组件投影过来的

在父组件中:

```

```



在子组件中:

```

```

## 13 angular的表单处理

### 13.1 纯HTML表单

显示表单项

校验用户输入

提交表单数据

```html
<!-- 纯HTML表单 -->
<form action="/register" method="post">
  <div>用户名: <input type="text" required pattern="[a-zA-Z0-9]"></div>
  <div>手机号: <input type="text"></div>
  <div>邮政编码: <input type="number" min="000000" max="999999"></div>
  <div>密码: <input type="password"></div>
  <div>确认密码: <input type="password"></div>
  <button type="submit">注册</button>
</form>
<!-- 表单应该具有以下几个功能
1.每个输入字段都可以独立指定一些校验规则
2.如果用户输入的不符合规则,那么就在输入框旁边提示错误
3.彼此依赖的字段应该总是被一起校验
4.应用应该可以确认提交表单的值
5.应用应该可以控制这些数据如何被提交到服务器 -->
<!-- HTML提供了简单的校验,也可以简单地提示错误,还可以简单地设置格式 -->
```

### 13.2 angular提供了更加有效的表单处理

模板式表单:

表单的数据模型是通过组件模板中的相关指令来定义的,因为使用这种方式定义表单的数据模型时,我们会首先与HTML的语法,所以,模板驱动方式只适合用于一些简单的场景

如果要使用模板式表单,在app.module.ts文件中要引入 FormsModule 模板

```js
import { FormsModule } from '@angular/forms';


imports: [
    BrowserModule,
    FormsModule
  ],
```

使用的指令有: NgForm  NgModel  NgModelGroup

```

```







响应式表单

使用响应式表单时,你通过编写TypeScript 代码而不是HTML代码来创建一个底层的数据模型,在这个模型定义好以后,你使用一些特定的指令,将目标上的HTML元素与底层的数据模型连接在一起

如果要使用响应式表单,在app.module.ts文件中要引入 ReactiveFormsModule 模板

```js
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  // 省略其他
    imports: [..., ReactiveFormsModule],
  // 省略其他

```

第一步:使用三个类创建数据模型

FormControl : 是构成表单的基本单位 ,通常来表示一个input元素 , 但是也可以来代表一个更复杂的元素,比如日历控件,下拉选择框 ; 它保存着与其关联的html元素当前的值以及其元素的校验状态,还有元素是否被修改过等信息



FormGroup : 既可以代表表单的一部分,也可以代表整个表单,是多个FormControl的集合,里面有多个 FormControl的值,如果里面有一个FormControl是无效的,那么整个FormGroup就是无效的 , 可以用来方便地管理相关联的表单,比如密码和确认密码



FormArray : 跟FormGroup 是类似的,但是有一个额外的长度属性 , 一般来说,FormGroup 来代表整个表单或者是表单的固定的子集 , 而FormArray 代表可以增长的字段的集合,比如说用户有多个邮箱要输入; 注意FormArray中要访问里面的数据时没有相应的key的,是能通过索引来访问 

响应式表单的类和指令

第二列是使用属性绑定时使用的指令

第三列是使用属性的名字来连接数据模型和DOM元素的



| 类名        |             | 指令            |
| ----------- | ----------- | --------------- |
| FormGroup   | formGroup   | formGroupName   |
| FormControl | formControl | formControlName |
| FormArray   |             | formArrayName   |



模板式表单和响应式表单的区别:

+ 表单中的指令如果都是ng开头的就是模板式表单,如果都是form开头的,那就是响应式表单
+ 响应式表单中的指令时不可引用的,也就是不能通过 #myForm=... 来引用表单
+ 模板式表单只能在模板中操作,响应式表单只能在代码中操作

FormBuilder 注入服务,简化表单数据模型的创建

```js
formModel:FormGroup
  constructor(fb:FormBuilder) {
    //注入服务之后,new FormGroup 可以替换成 fb.group 这个方法中还可以传入第二个参数,可以用来校验这个formGroup,此外
    //还可以用数组来实例化一个FormControl , 所以将new FormControl()直接替换成 [''] , 数组的第一个元素是 formControl的初始值,第二个元素是一个校验方法,第三个元素是一个异步校验方法
    this.formModel = fb.group({
      username:[''],
      mobile:[''],
      passwordsGroup:fb.group({
        password:[''],
        pconfirm:['']
      })
    })
  }
```

## 14响应式表单校验

### angular的校验器

就是一个普通的方法,方法的名字随便写,方法中必须传入一个参数,这个参数的类型必须是 AbstractControl类型的,然后必须有一个返回值,这个返回值可以是任意类型的对象,对这个对象只有一个要求,它的key必须是string类型的,值可以是任意类型的

```js
xxx(control:AbstractControl):{[key:string]:any}{
    return null
}
```

angular有一些自定义的校验器,这些校验器都是在 validators中的,但是这些校验都比较简单,如果我们需要处理一些复杂的校验,那么就需要我们自己定义一些校验器



这些校验器现在都是写在组件的控制器中,也可以单独抽离出来作为一个文件

```js
ng g validtor validator/validators.ts
```



异步校验器:可以调用远程的服务来进行校验,也是一个方法,不同的是,它返回的不是一个对象,而是一个流

###  状态字段

在表单初始化在页面上的时候, 一开始表单就是空的,就有提示错误,但是以后还什么都没有做的,这是不合理的,所以有状态字段来处理,状态字段有三种:

+ touched 和 untouched

  判断用户是否访问过的字段,就是判断这些字段是否获取过焦点,如果获取过焦点,touched就是true,untouched就是 false,反之,没获取过焦点,touched就是false, untouched就是true

  这两个字段就是来控制错误信息是否要显示

+ pristine 和 dirty

  如果一个字段的值从来没有被改变过,那么,pristine就是true , dirty就是false ; 反之,如果字段被修改过,那么pristinez就是false , dirty 就是true

  上面的 两种字段有一个共同点,只有当整个表单内部的字段都是 untouched或者是pristine的时候,整个表单的字段状态才是 untouched或者pristine,只要有一个表单的字段是touched或者dirty,那么整个表单的字段就是 touched或dirty

+ pending

  当一个字段在处于异步校验时,字段的状态为 pending,这个时候,可以显示一段文字或者图片来让用户知道正在校验

angular会自动帮助这些字段元素上加上对应的类名,我们可以通过这些类名来设置不同状态的字段的样式



## 15 模板式表单的校验

需要将之前的那些校验方法包装成一个指令才行,然后直接在模板的标签上使用这些指令

首先生成一个定义指令的文件

```js
ng g directive directives/mobileValidators
```

就是一个没有模板的组件

angular中有自己的简单的校验器,这些校验器也可以用指令的方式添加到模板上进行校验,比如 required 这是angular提供的,不是浏览器提供的,所以为了区分,在form上加上 novalidate 属性,不进行浏览器的默认校验

### 自定义指令

自定义指令中使用@HostBingDing() 和@HostListenner() 

#### @HostBinding() 装饰器

设置宿主的属性，比如样式： height，width，color，margin, border等等

用法： @HostBingding()接受一个参数，这个参数用于指定宿主的属性的名字

```js
@HostBinding('class.active')

@HostBinding('disabled')

@HostBinding('attr.role')
```

#### @HostListener() 装饰器

处理宿主的事件，比如mouseover, mosuout, keydown等等

用法：@HostListener() 接受一个参数，该参数用于指定宿主的事件的名字

自定义指令实例:

```
ng g directive rainbow
```

```js
import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appRainbow]'
})
export class RainbowDirective {
    possibleColors = [
        'darksalmon', 'hotpink', 'lightskyblue', 'goldenrod', 'peachpuff',
        'mediumspringgreen', 'cornflowerblue', 'blanchedalmond', 'lightslategrey'
    ];

    @HostBinding('style.color') color: string;
    // @HostBinding('style.border-color') borderColor: string;
    @HostBinding('style.border-bottom-color') borderBottomColor: string;

    @HostListener('keydown') newColor() {
        const colorPick = Math.floor(Math.random() * this.possibleColors.length);

        this.color = this.borderBottomColor = this.possibleColors[colorPick];
    }
}
```

使用指令:

```html
<input type="text" appRainbow>
```

## 16 与服务器通讯

创建web服务器

使用Node.js创建服务器

```js
//建立一个文件夹,在终端中 npm init -y 初始化文件
//要使用typeScript来开发,要引用类型定义文件,可以让我们使用javaScript工具包
npm i @types/node --save
//但是node不认识 typeScript , 所以要写一些配置,创建 tsconfig.json配置文件
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "outDir": "build",
        "lib":["es6"]
    },
    "exclude": [
        "node_modules"
    ]
}
//还需要让IDE知道我们要用这个配置文件作为配置来编译typeScript
//本地安装express
npm i express -S
//安装类型文件
npm i @tyeps/express -S
//安装nodemon, 文件改变后自动重启服务器
npm i nodemon -g
//之后就使用 nodrmon 文件名 来启动服务器
```



### Http请求

```js
//1.在组件的控制器中注入服务,在app.module.ts文件中导入 HttpModule模块,在组件控制器中注入http服务
//2.配置发送请求的根地址,我们的页面是4200端口,后台是8000端口,在项目中增加一个文件: proxy-conf-json , 在里面配置: 只要是以'/api'开头的请求,就是请求8000端口
{
    "/api":{
        "target":"http://localhost:8000"
    }
}
//3.在package.json文件中修改 start : 
"start": "ng serve --proxy-config proxy.conf.json"
//4.重新启动项目,以后发送请求都是以 '/api/products'  这种请求路径

//在组件中真正发sing请求的不是get方法触发的,而是 ngOnInit方法中的订阅方法subscribe,而且,请求响应回来的数据也是流,所以要将数据转化为json格式
export class ProductComponent implements OnInit{
    dataSource:Observable<any>
    products:Array<any> = []
	constructor(private http:Http){
    	this.dataSource = 		this.http.get('/api/products').map(res=>{
        res.json()
    	})
	}
}
ngOnInit(){
    this.dataSource.subscribe(
    	data => this.products = data
    )
}
//模板上的代码:
<ul>
	<li *ngFor="let product of products">		</li>    
</ul>

//另外还可以以管道的方式来处理返回的数据,异步管道可以接收一个流,将控制器和模板中的代码都修改一下,更简单了
export class ProductComponent implements OnInit{
    products:Observable<any>
	constructor(private http:Http){
    	this.products = this.http.get('/api/products').map(res=>{res.json()})
        .subscribe(data => {
             alert(JSON.stringify(data));
          }, err => {
            console.error('ERROR', err);
          });
	}
}
ngOnInit(){
}
<ul>
	<li *ngFor="let product of products | async">		</li>    
</ul>

//在请求中加上请求头:
import {Http, Headers} from "@angular/http"
OnInit{
    let myHeaders:Headers=new Headers()
    myHeaders.append("authorization","Basic 123456")
    products:Observable<any>
	constructor(private http:Http){
    	this.products = this.http.get('/api/products',{headers:myHeaders}).map(res=>{
        res.json()
    	})
	}
}

//在请求中携带参数
 getData() {
    const dates = {
     'str': 123
  };

  this.http.get('地址' , {params: dates})
  .map(res => res.json())
  .subscribe(data => {
    alert(JSON.stringify(data));
  }, err => {
    console.error('ERROR', err);
  });
```



### POST请求

带参数的post请求

```js
getData(fileId) {
    let datas = {
        headers : new Header({'content-Type':'application/json;charset-utf-8'}),
        'id':fileId
    }
  this.http.post(  '地址' ,  datas)
  .map(res => res.json())
  .subscribe(data => {
     alert(JSON.stringify(data));
  }, err => {
    console.error('ERROR', err);
  });
```

**注意: (<any>data).map()方法直接把读取data数据转换成实体类。【注：需要查看自己的json文件，对应好结构】 网上很多json都是以results[]开头。以所用(<any>data).results.map()  **

### WebSocket通讯 

WebSocket协议:支持长连接,在同一时间点可以既发送数据,同时也可以接收数据,所以延迟比Http协议要低

注意:要使用 map 方法,要先导入: import "rxjs/Rx"

使用步骤:

1. 安装 WebSocket

   npm i ws -S

2. 安装类型定义文件

   npm i @types/ws -S

3. 实现需求:客户端连接到服务器的时候,服务器主动向客户端推送消息

   服务器端:

   ```js
   import{server} from 'ws'
   const wsServer = new Server({port:8085})
   wsServer.on("connection",websocket =>{
       websocket.send("这个消息是服务器主动推送的")
       //接收到客户端的消息时:
       websocket.on("message",message=>{
           console.log("接收到消息"+message)
       })
   })
   
   ```

   客户端: 在客户端需要也建立一个 Socket来接收这个流,然后组件可以通过订阅这个流来将消息显示在模板上, 但是angular并没有提供一个像Http这样的服务,所以我们需要自己定义一个这样的服务

    先在项目中生成一个服务

   ng g service shared/webSocket

   ```js
   //web-sockwt.service.ts
   //在这个文件中要实现两个方法,一个是要返回一个流,二个是要发送一个消息给服务器
   import {Injectable} from "@angular/core"
   @Injectable()
   export class WebSocketService{
       ws:WebSocket
       constructor(){
           //创建一个可观测的Socket
           creatObservableSocket(url:string):Observable<any>{
               this.ws = new WebSocket(url) //这里就去连接服务器了
               return new Observable(
               	//要定义一个流:1.什么视乎发射下一个元素,2.什么时候抛一个异常,3.什么时候发送流结束的信号
               observer=>{
               this.ws.onmessage = (event)=>
               observer.next(event.data)
               this.ws.onerror = (event)=> observer.error(event)
               this.ws.onclose = (event)=> observer.complete()
           		}
               )
           }
   sendMessage(message:string){
       this.ws.send(message)
   }
       }
   }
   ```

   

在客户端再生成一个组件,在组件中订阅这个流

ng g component webSocket

```js
//在里面做两件事,一个是接收服务器的消息,第二个是向服务器发消息
export class WebSocketComponent implements OnInit{
    //把前面写的webSocket服务通过依赖注入注入到组件中来,注意使用依赖注入的时候,别忘了在app.module.ts中的providers提供器中声明一下 : providers:[WebSocketService]
    constructor(private wsService : WebSocketService){
        
    }
    ngOnInit(){
        		   this.wsService.creatObservableSocket("ws://localhost:8085")
        .subscribe(
            data => console.log(data)
            err => console.log(err)
        	()=>console.log("流已经结束")
        )
    }
    //下面向服务器主动发消息
    sendMessageToServer(){
        this.wsService.sendMessage("hello from client")
    }
}
```

组件模板:

```html
<button (click)="sendMessageToServer()">向服务器发消息</button>
```



在上面的这个例子中,只能在客户端连接上服务器的时候,服务器才想客户端推送一条消息,怎样做到在任何需要的时候向客户端推送消息呢?

在服务器端:

```js
import{server} from 'ws'
const wsServer = new Server({port:8085})
wsServer.on("connection",websocket =>{
    websocket.send("这个消息是服务器主动推送的")
    //接收到客户端的消息时:
    websocket.on("message",message=>{
        console.log("接收到消息"+message)
    })
})
setInterval(()=>{
    //只要有客户端连接
    if(wsServe.clients){
        //向每一个客户端定时推送消息
        wsServe.clients.forEach(client=>{
            client.send("这是定时推送")
        })
       }
},2000)
```

## 17 构建和部署

构建: 编译与合并

```js
 ng build  
 //构建完成之后,项目根目录中会出现一个dist的文件夹
```

部署: 与服务器整合

```js
//将之前生成的dist中的文件夹拷贝到服务器中,在服务器中新建一个client的文件夹,将代码拷贝到这里来
//启动服务器: nodemon serve.js
//在服务器中引入path
import * as path from 'path'
//将访问 '/'改变一下,自动去找client里面的index.html
app.use('/',express.static(path.join(__dirname,'..','client')))
//还有一个问题,不能刷新,在其他地址上进行刷新的时候,服务器上没有这个请求,解决方法是在项目文件中的providers中增加一个服务:
providers:[{provide:LocationStrategy,useClass:HashLocationStrategy}]
//注意,这一步是在源代码上修改的,所以需要重新编译 ng build
```

多环境: 一套代码支持多种环境

开发,测试和生产可能不一样

在angular中有一个环境文件,在 angular-cli.json文件中有环境的配置

## 18 路由相关知识

### Base href

我们需要做的最后一件事，是将 `<base>` 标签添加到我们的 index.html 文件中。路由需要根据这个来确定应用程序的根目录。例如，当我们转到 http://example.com/page1 时，如果我们没有定义应用程序的基础路径，路由将无法知道我们的应用的托管地址是 http://example.com 还是 http://example.com/page1 。
这件事操作起来很简单，只需打开项目中的 index.html 文件，添加相应的 <base> 标签，具体如下：

```html
<!doctype html>
<html>
  <head>
    <base href="/">
    <title>Application</title>
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

以上配置信息告诉 Angular 路由，应用程序的根目录是 / 。

### Using the router

要使用路由，我们需要在` `AppModule 模块中，导入 RouterModule 。具体如下： 

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ]
})
export class AppModule {}
```

此时我们的路由还不能正常工作，因为我们还未配置应用程序路由的相关信息。`RouterModule` 对象为我们提供了两个静态的方法：`forRoot()` 和 `forChild()` 来配置路由信息。 

#### RouterModule.forRoot()

RouterModule.forRoot() 方法用于在主模块中定义主要的路由信息，通过调用该方法使得我们的主模块可以访问路由模块中定义的所有指令。接下来我们来看一下如何使用 forRoot() ：

```js
// ...
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  // ...
})
export class AppModule {}
```

我们通过使用 `const` 定义路由的配置信息，然后把它作为参数调用 `RouterModule.forRoot()` 方法，而不是直接使用 `RouterModule.forRoot([...])` 这种方式，这样做的好处是方便我们在需要的时候导出 `ROUTES` 到其它模块中。 

#### RouterModule.forChild()

RouterModule.forChild() 与 Router.forRoot() 方法类似，但它只能应用在特性模块中。

**注意:友情提示：根模块中使用 `forRoot()`，子模块中使用 `forChild()` **

这个功能非常强大，因为我们不必在一个地方（我们的主模块）定义所有路由信息。反之，我们可以在特性模块中定义模块特有的路由信息，并在必要的时候将它们导入我们主模块。`RouterModule.forChild()` 的使用方法如下： 

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  // ...
})
export class ChildModule {}
```

通过以上示例，我们知道在主模块和特性模块中，路由配置对象的类型是一样的，区别只是主模块和特性模块中需调用不同的方法，来配置模块路由。接下来我们来介绍一下如何配置 `ROUTES` 对象。 

### Configuring a route

我们定义的所有路由都是作为 `ROUTES` 数组中的对象。首先，为我们的主页定义一个路由：

```js
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  // ...
})
export class AppModule {}
```

示例中我们通过 `path` 属性定义路由的匹配路径，而 `component` 属性用于定义路由匹配时需要加载的组件。 

**注意:我们使用 `path: ''` 来匹配空的路径，例如：`https://yourdomain.com` **

### Displaying routes

配置完路由信息后，下一步是使用一个名为 router-outlet 的指令告诉 Angular 在哪里加载组件。当 Angular 路由匹配到响应路径，并成功找到需要加载的组件时，它将动态创建对应的组件，并将其作为兄弟元素，插入到 router-outlet 元素中。
在我们 AppComponent 组件中，我们可以在任意位置插入 router-outlet 指令：

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <h3>Our app</h3>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
```

我们现在已经建立了应用程序的主路由，我们可以进一步了解路由的其它配置选项。 

### Further configuration

到目前为止我们已经介绍的内容只是一个开始 ，接下来我们来看看其它一些选项和功能。

#### Dynamic routes

如果路由始终是静态的，那没有多大的用处。例如 `path: ''` 是加载我们 `HomeComponent` 组件的静态路由。我们将介绍动态路由，基于动态路由我们可以根据不同的路由参数，渲染不同的页面。

例如，如果我们想要在个人资料页面根据不同的用户名显示不同的用户信息，我们可以使用以下方式定义路由：

```js
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: '/profile/:username', component: ProfileComponent }
];
```

 这里的关键点是 `:` ，它告诉 Angular 路由，`:username` 是路由参数，而不是 URL 中实际的部分。 

 **友情提示：如果没有使用 `:` ，它将作为静态路由，仅匹配 `/profile/username` 路径 **

现在我们已经建立一个动态路由，此时最重要的事情就是如何获取路由参数。要访问当前路由的相关信息，我们需要先从 `@angular/router` 模块中导入 `ActivatedRoute` ，然后在组件内的构造函数中注入该对象，最后通过订阅该对象的 `params` 属性，来获取路由参数，具体示例如下：

```js
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile-page',
  template: `
    <div class="profile">
      <h3>{{ username }}</h3>
    </div>
  `
})
export class SettingsComponent implements OnInit {
  username: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe((params) => this.username = params.username);
  }
}
```

 介绍完动态路由，我们来探讨一下如何创建 `child routes`。 

#### Child routes

实际上每个路由都支持子路由，假设在我们 `/settings` 设置页面下有 `/settings/profile` 和 `/settings/password` 两个页面，分别表示个人资料页和修改密码页。

我们可能希望我们的 `/ settings` 页面拥有自己的组件，然后在设置页面组件中显示 `/ settings/profile` 和 `/ settings/password` 页面。我们可以这样做：

```js
import { SettingsComponent } from './settings/settings.component';
import { ProfileSettingsComponent } from './settings/profile/profile.component';
import { PasswordSettingsComponent } from './settings/password/password.component';

export const ROUTES: Routes = [
  { 
    path: 'settings', 
    component: SettingsComponent,
    children: [
      { path: 'profile', component: ProfileSettingsComponent },
      { path: 'password', component: PasswordSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
})
export class AppModule {}
```

 在这里，我们在 `setttings` 路由中定义了两个子路由，它们将继承父路由的路径，因此修改密码页面的路由匹配地址是 `/settings/password` ，依此类推。

接下来，我们需要做的最后一件事是在我们的 `SettingsComponent` 组件中添加 `router-outlet` 指令，因为我们要在设置页面中呈现子路由。如果我们没有在 `SettingsComponent` 组件中添加 `router-outlet` 指令，尽管 `/settings/password` 匹配修改密码页面的路由地址，但修改密码页面将无法正常显示。具体代码如下：

```js
import { Component } from '@angular/core';

@Component({
  selector: 'settings-page',
  template: `
    <div class="settings">
      <settings-header></settings-header>
      <settings-sidebar></settings-sidebar>
      <router-outlet></router-outlet>
    </div>
  `
})
export class SettingsComponent {}
```

####  Component-less routes

另一个很有用的路由功能是 `component-less` 路由。使用 `component-less` 路由允许我们将路由组合在一起，并让它们共享路由配置信息和 outlet。

例如，我们可以定义 `setttings` 路由而不需要使用 `SettingsComponent` 组件：

```js
import { ProfileSettingsComponent } from './settings/profile/profile.component';
import { PasswordSettingsComponent } from './settings/password/password.component';

export const ROUTES: Routes = [
  {
    path: 'settings',
    children: [
      { path: 'profile', component: ProfileSettingsComponent },
      { path: 'password', component: PasswordSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
})
export class AppModule {}
```

 此时， `/settings/profile` 和 `/settings/password` 路由定义的内容，将显示在 `AppComponent` 组件的 `router-outlet` 元素中。 

####  loadChildren 路由懒加载

我们也可以告诉路由从另一个模块中获取子路由。这将我们谈论的两个想法联系在一起 - 我们可以指定另一个模块中定义的子路由，以及通过将这些子路由设置到特定的路径下，来充分利用 `component-less` 路由的功能。

让我们创建一个 `SettingsModule` 模块，用来保存所有 `setttings` 相关的路由信息：

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'profile', component: ProfileSettingsComponent },
      { path: 'password', component: PasswordSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
})
export class SettingsModule {}
```

 需要注意的是，在 `SettingsModule` 模块中我们使用 `forChild()` 方法，因为 `SettingsModule` 不是我们应用的主模块。

另一个主要的区别是我们将 `SettingsModule` 模块的主路径设置为空路径 ('')。因为如果我们路径设置为 `/settings` ，它将匹配 `/settings/settings` ，很明显这不是我们想要的结果。通过指定一个空的路径，它就会匹配 `/settings` 路径，这就是我们想要的结果。

那么 `/settings` 路由信息，需要在哪里配置？答案是在 `AppModule` 中。这时我们就需要用到 `loadChildren` 属性，具体如下：

```js
export const ROUTES: Routes = [
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  // ...
})
export class AppModule {}
```

需要注意的是，我们没有将 `SettingsModule` 导入到我们的 `AppModule` 中，而是通过 `loadChildren` 属性，告诉 Angular 路由依据 `loadChildren` 属性配置的路径去加载 `SettingsModule` 模块。这就是模块懒加载功能的具体应用，当用户访问 `/settings/**` 路径的时候，才会加载对应的 `SettingsModule` 模块，这减少了应用启动时加载资源的大小。

另外我们传递一个字符串作为 `loadChildren` 的属性值，该字符串由三部分组成：

- 需要导入模块的相对路径
-  `#` 分隔符
- 导出模块类的名称

了解完路由的一些高级选项和功能，接下来我们来介绍路由指令。

###  Router Directives

 除了 `router-outlet` 指令，路由模块中还提供了一些其它指令。让我们来看看它们如何与我们之前介绍的内容结合使用。

#### routerLink

为了让我们链接到已设置的路由，我们需要使用 `routerLink` 指令，具体示例如下：

```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/settings/password">Change password</a>
  <a routerLink="/settings/profile">Profile Settings</a>
</nav>
```

 当我们点击以上的任意链接时，页面不会被重新加载。反之，我们的路径将在 URL 地址栏中显示，随后进行后续视图更新，以匹配 `routerLink` 中设置的值。 

**友情提示：我们也可以将 `routerLink` 的属性值，改成数组形式，以便我们传递特定的路由信息 **

如果我们想要链接到动态的路由地址，且该地址有一个 `username` 的路由变量，则我们可以按照以下方式配置 `routerLink` 对应的属性值： 

```html
<a [routerLink]="['/profile', username]">
  Go to {{ username }}'s profile.
</a>
```

####   routerLinkActive

在实际开发中，我们需要让用户知道哪个路由处于激活状态，通常情况下我们通过向激活的链接添加一个 class 来实现该功能。为了解决上述问题，Angular 路由模块为我们提供了 `routerLinkActive` 指令，该指令的使用示例如下：

 

```html
<nav>
  <a routerLink="/settings" routerLinkActive="active">Home</a>
  <a routerLink="/settings/password" routerLinkActive="active">Change password</a>
  <a routerLink="/settings/profile" routerLinkActive="active">Profile Settings</a>
</nav>
```

 通过使用 `routerLinkActive` 指令，当 `a` 元素对应的路由处于激活状态时，`active` 类将会自动添加到 `a` 元素上。

最后，我们来简单介绍一下 Router API。

### Router API

我们可以通过路由还提供的 API 实现与 `routerLink` 相同的功能。要使用 Router API，我们需要在组件类中注入 `Router` 对象，具体如下：

 

```js
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <h3>Our app</h3>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(private router: Router) {}
```

 组件类中注入的 `router` 对象中有一个 `navigate()` 方法，该方法支持的参数类型与 `routerLink` 指令一样，当调用该方法后，页面将会自动跳转到对应的路由地址。具体使用示例如下： 

```js
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <h3>Our app</h3>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/settings']);
    }, 5000);
  }
}
```

 若以上代码成功运行，用户界面将在 5 秒后被重定向到 `/settings` 页面。这个方法非常有用，例如当检测到用户尚未登录时，自动重定向到登录页面。

另一个使用示例是演示页面跳转时如何传递数据，具体如下：

```js
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <h3>Users</h3>
      <div *ngFor="let user of users">
        <user-component 
          [user]="user"
          (select)="handleSelect($event)">
        </user-component>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit {
  users: Username[] = [
    { name: 'toddmotto', id: 0 },
    { name: 'travisbarker', id: 1 },
    { name: 'tomdelonge', id: 2 }
  ];
  
  constructor(private router: Router) {}
  
  handleSelect(event) {
    this.router.navigate(['/profile', event.name]);
  }
}
```

 除了使用 `navigate()` 方法外还有没有其它方法可以实现页面导航？

Angular Router API 为我们提供了 `navigate()` 和 `navigateByUrl()` 方法来实现页面导航。那为什么会有两个不同的方法呢？

使用 `router.navigateByUrl()` 方法与直接改变地址栏上的 URL 地址一样，我们使用了一个新的 URL 地址。然而 `router.navigate()` 方法基于一系列输入参数，产生一个新的 URL 地址。为了更好的区分它们之间的差异，我们来看个例子，假设当前的 URL 地址是：

```
/inbox/11/message/22(popup:compose)
```

 当我们调用 `router.navigateByUrl('/inbox/33/message/44')`  方法后，此时的 URL 地址将变成 `/inbox/33/message/44` 。但如果我们是调用 `router.navigate('/inbox/33/message/44')` 方法，当前的 URL 地址将变成 `/inbox/33/message/44(popup:compose)` 。

##  19路由复用策略

部分页面需要保存用户的输入信息，用户再次进入页面时需要回到上一次离开时的状态，部分页面每次都要刷新页面，不需要保存用户信息。而页面间的导航正是通过路由实现的，Angular的默认行为不能满足我们的需求！ 

针对以上问题，通过查阅Angular的相关资料可以发现，Angular提供了RouteReuseStrategy接口，通过实现这个接口，可以让开发者自定义路由复用策略。 

###  19.1  RouteReuseStrategy接口

这个接口只定义了5个方法，每个方法的作用如下：

- shouldDetach

路由离开时是否需要保存页面，这是实现自定义路由复用策略最重要的一个方法。

其中：

返回值为true时，路由离开时保存页面信息，当路由再次激活时，会直接显示保存的页面。

返回值为false时，路由离开时直接销毁组件，当路由再次激活时，直接初始化为新页面。

-  store

如果shouldDetach方法返回true，会调用这个方法来保存页面。

-  shouldAttach

路由进入页面时是否有页面可以重用。 true： 重用页面，false：生成新的页面

- retrieve

路由激活时获取保存的页面，如果返回null，则生成新页面

- shouldReuseRout

决定跳转后是否可以使用跳转前的路由页面，即跳转前后跳转后使用相同的页面



Angular实现了一个默认的路由重用策略：DefaultRouteReuseStrategy，在这个默认的路由复用策略中，只有当跳转前和跳转后的路由一致时，才会复用页面。只要跳转前和跳转后的路由不一致，页面就会被销毁。 

 有鉴于此，我们需要实现一个自定义的路由复用策略，实现针对不同的路由，能够有不同的行为。同时，也要能兼容现有代码，不能对现有代码做大规模的修改。 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 