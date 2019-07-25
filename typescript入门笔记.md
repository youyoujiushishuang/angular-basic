# typeScript 

## typeScript的优势

+ 支持ES6的规范
+ 强大的IDE支持,语法提示,重构
+ angular2的开发语言

## typeScript的开发环境

+ compiler编译器:

  将typeScript的代码编译成javaScript代码,因为所有的主流浏览器还没有支持ES6

+ 使用在线的compiler开发

  在typescript官网中有一项 Playground 里面可以同步将typeScript代码编译成javaScript代码

+ 安装编译器

  npm i typescript -g

  tsc -v 检查是否安装成功

  创建一个ts文件hello.ts,在里面写typeScript的代码,在文件所在的文件夹中打开命令行窗口,输入 tsc hello.ts  就会在同级目录下生成一个hello.js文件,里面就是编译之后的ES5的代码

## typeScript的语法和特性

### 1 字符串

#### 1.1 多行字符串

使用模板字符串来声明多行字符串,不用再进行字符串的拼接

#### 1.2 字符串模板

在多行字符串中去用一个表达式去插入变量或者调用方法

```js
console.log(`hello ${name}`)
console.log(`hello ${getName()}`)
```

#### 1.3 自动拆分字符串

当你用字符串模板去调用一个方法时,这个字符串里面的表达式的值自动会赋给被调用的参数

```js
function test(template,name,age){
    console.log(template)
    console.log(name)
    console.log(age)
}
var myName = "zhai yao"
var getAge = function (){
	return 18
}
test`hello my name is ${myName},my age is ${getAge()}`
//这里是拿字符串模板去调test方法,字符串模板里面,表达式的值会进到相应的参数里面,第一个参数的值就是字符串模板,第二个参数就是第一个表达式的值,以三个参数就是第二个表达式的值
//最后打印出来的结果是:
Array["hello my name is ",",my age is ",""]
zhai yao
18
```

### 2 参数的新特性

#### 2.1 参数的类型

在参数的后面使用冒号来指定参数的类型

```js
var myName:string = "zhai yao"
myName = 18
//在编辑代码的过程中,会报错,但是编译之后的javascript代码是不会报错的,因为JavaScript是弱类型的

//那么在赋值的时候先不要声明类型
var alias = "xixi"
alias = 18
//同样会报错,因为typeScript有一个推测类型的机制,会在你第一次声明这个对象的时候,根据值去自动判断类型

//如果真的想改变成不同类型的值,那么在开始声明变量的时候可以定义为 any 类型
var alias = "xixi"
alias = 18
```

typeScript 中的所有的参数类型有: 

number :  数值类型

boolean : 布尔类型

string : 字符串类型

void : 用来声明方法的返回值的,不需要任何返回值,如果有返回值就会报错

```js
function test (): void {
    //如果这里有return XXX  就会报错
}
//同样也可以声明函数的返回值是其他类型:
function test (): string {
    //如果这里有return XXX  就会报错
}
//还可以给方法的参数也声明类型,在调用方法的时候传递的参数必须是这个类型的值,不然会报错
function test (name:string): void {
    //如果这里有return XXX  就会报错
}
```

#### 2.2 自定义类型

```js
class Person {
    name:string;
    age:number
}
var zhangsan: Person = new Person();
zhangsan.name = "zhangsan"
zhangsan.age = 18
```

#### 2.3 默认参数

在参数后面用等号来指定参数的默认值

```js
var name : string = "zhai yao"
function test (a: string, b: string, c:string){
    console.log(a)
    console.log(b)
    console.log(c)
}
test("xxx","yyy","zzz")
//必须传三个参数才行,少了就会报错

//所以在定义方法的时候就可以指定方法默认的参数
function test (a: string, b: string, c:string = "jojo"){
    console.log(a)
    console.log(b)
    console.log(c)
}
//指定了默认值的参数可以不用传参
test("xxx","yyy")
```

注意: 带默认值的参数一定要声明在最后面,如果声明在前面,就会报错

#### 2.4 可选参数

在方法的参数声明的后面用问号来表名此参数为可选参数

```js
function test (a: string, b?: string, c:string = "jojo"){
    console.log(a)
    console.log(b)
    console.log(c)
}
//指定了默认值的参数可以不用传参,可选参数不用传参
test("xxx")

```

注意: 

+ 当声明了可选参数,那么在方法中如果用到了可选参数,就要先对如果没有传入可选参数的情况进行设置
+ 一个可选参数必须声明在必选参数的后面

### 3 函数新特性

#### 3.1 Rest and Spread 操作符--扩展运算符

用来声明任意数量 的方法参数

```js
function fun1 (...args){
    args.forEach(function(arg){
        console.log(arg)
    })
}
fun1(1,2,3)		//1  2  3
fun1(1,3,5,7,9)   //1  3  5  7  9
```

还有一种方法,typeScript还不支持,但是可以先看看

```js
function fun2 (a,b,c){
    console.log(a)
    console.log(b)
    console.log(c)
}
var arg1 = [1,2]
fun2(...arg1)  //1 2 undefined
var arg2 = [7,8,9,10,11]
fun2(...arg2)  //7  8  9
```

#### 3.2 generator函数

控制函数的执行过程,手工暂停和恢复代码执行

目前typrScript还不支持,是ES6中的语法

可以在 Babel 中进行练习

```js
function* deSomething(){
    console.log("start")
    yield;
    console.log("end")
}
//doSomething()
//像上面这样直接调用generator是不行的,不起作用,需要先把这个调用赋值给一个变量
var func1 = doSomething()
func1.next()  // start 
//函数执行遇到 yield 就会停下来
//再次调用
func1.next()   // end

```

需求: 买股票,在价格低于某一个值的时候,自动去购买股票

```js
function* getStockPrice (stock){
    while(true){
        yield Math.random()*100
    }
}
var priceGenerator = getStockPrice("IBM")

var limitPrice = 15

var price = 100

while(price > limitPrice){
    price = priceGenerator.next().value
    console.log(`the generator return ${price}`)
}
//当价格大于15的时候会一直循环,直到价格小于15,就结束
```

#### 3.3 destrucyuring 析构表达式

通过表达式将对象或数组拆解成任意数量的变量

```js
function getStock(){
    return {
        code : "IBM"
        price : 100
    }
}
//要想获取股票的编码和价格,在ES5中是这样做的:
/* var stock = getStock()
var code = stock.code
var price = stock.price */
//在ES6中有对象解构赋值可以完成
var {code , price} = getStock()
```

注意: 在结构赋值的时候,定义的变量要和对象中的属性名一致,如果想要改变,就在定义的变量后面加上冒号,后面写上新的变量名

```js
var {code:aa , price:bb} = getStock()
```

那么如何拿到嵌套的属性

```js
function getStock(){
    return {
        code : "IBM"
        price : {
        	price1:100
        	price2:200
    	}
    }
}
var {code:aa , price:{price2}} = getStock()
console.log(aa)   // IBM
console.log(price2)   // 200
```

解构赋值--析构表达式也可以用在数组上

```js
var array1 = [1,2,3,4]
var [num1,num2] = array1
console.log(num1)  // 1
console.log(num2)  // 2
//如果想要拿到3和4 
var [ , , num1,num2] = array1
```

将结构赋值和参数扩展运算符结合起来用

```js
var array1 = [1,2,3,4]
var [num1,num2,...others] = array1
console.log(num1)  // 1
console.log(num2)  // 2 
console.log(others)  // [3 , 4]

```

把析构表达式当做一个方法参数

```js
var array1 = [1,2,3,4]
function doSomething(num1,num2,...others){
    console.log(num1)  
	console.log(num2)  
	console.log(others)  
}
doSomething(array1)
```

### 4 表达式和循环

#### 4.1 箭头表达式

用来声明匿名函数,消除传统匿名函数的this指针问题

```js
//将普通函数中的`function 函数名`去掉,在小括号和大括号之间加上 `=>`
function add (x,y){
    return x+y;
}
//将以上函数改造为箭头函数,本质为匿名函数
(x,y) => {
    return x+y;
}
```



```js
//---------------------------变体1
//形参只有一个参数时,小括号可以省略
 var add = x => {
    return x+10;
}
console.log(add(1));

//-----------------------------变体2
//函数体只有一行代码时,大括号可以省略,return也可以省略,默认会返回那行代码的执行结果
var add = (x,y) => x+y;
console.log(add(10,20));


//-----------------------------变体3
//当函数形参只有一个参数时,小括号可以省略,函数体只有一行代码时,大括号可以省略,return也可以省略
var add = x => x+20;
console.log(add(3))
```

常见的用法:

```js
var arr = [1,2,3,4,5,6]
//将数组中的偶数挑选出来,放在一个新数组中
//filter方法对数组的每个元素进行条件的判断,满足条件就返回true,就把这个元素放在一个新数组中
console.log(arr.filter(value=>value%2 == 0))
```

```js
function getStock(name:string){
    this.name = name
    setInterval(function(){
        console.log("name is" + this.name)
    },1000)
}
getStock("IBM") 
//这里的this.name得不到结果,因为定时器中this指向的是window
//将定时器中的函数改为箭头函数,改变this的指向
function getStock2(name:string){
    this.name = name
    setInterval(()=>{
        console.log("name is" + this.name)
    },1000)
}
```

#### 4.2 forEach() , for in 和 for of

```js
var arr = [1,2,3,4]
arr.desc = "four number"  //数组的描述
//上面这一行代码在typeScript中会报错,但是在javaScript中可以运行
arr.forEach(value=>console.log(value))
//1  2  3  4
```

注意: forEach 这个方法循环数组的时候,会将里面的属性忽略掉,而且不能中断,break也不能使用

```js
var arr = [1,2,3,4]
arr.desc = "four number"

for(var n in arr){
    console.log(n)
    console.log(arr[n])
}
// 0  1  2  3  desc
// 1  2  3  4  four number
//for in 遍历数组,n是指下标或索引,arr[n]才是每一项的值
//for in 遍历对象, n 是指对象的属性名
```



```js
var arr = [1,2,3,4]
arr.desc = "four number"

for(var n of arr){
    console.log(n)
}
// 1  2  3  4 
//for of 循环也会忽略数组中的属性,但是这里的 n 不是像 for in 循环里面指向的是键,而是直接指向值, 并且中途可以打断:
for(var n of arr){
    if(n > 2) break;
    console.log(n)
}
// 1  2
```



### 5 面向对象特性

#### 5.1 类

类是TypeScript的核心,使用TypeScript开发时,大部分代码都是写在类里面的

这里会介绍类的定义,构造函数,以及类的继承

##### 5.1.1类的声明:

```js
//定义类
class Person {
    name;
    eat(){
        console.log("is eating")
    }
}
//类的实例化
var p1 = new Person()
p1.name = "batman"
p1.eat()
var p2 = new Person()
p2.name = "superman"
p2.eat()
```

##### 5.1.2类的控制符:

类的访问控制符,有三个,看类的属性和方法是否能在类的外部被访问到,不声明的时候默认是public

1.public 

```js
//1. public : 公共的,类的属性和方法在类的内部和类的外部都能被访问到
//定义类
class Person {
    public name;
    public eat(){
        console.log("is eating")
    }
}
//类的实例化
var p1 = new Person()
p1.name = "batman"
p1.eat()
var p2 = new Person()
p2.name = "superman"
p2.eat()
```

2.private

```js
//2.private : 私有的,类的属性和方法只能在类的内部访问到,在类的外部不能被访问到
//定义类
class Person {
    private name;
    private eat(){
        //私有的,但是在类的内部可以被访问到
        console.log(this.name)
    }
}
//类的实例化
var p1 = new Person()
p1.name = "batman"
p1.eat()
var p2 = new Person()
p2.name = "superman"
p2.eat()
//这里会报错,在类的外部不能访问到 name 和 eat
```

3.protected 受保护的

类的属性和方法在类的内部和子类中能够被访问到,在类的外部不能被访问到

##### 5.1.3类的构造函数

constructor 实际上就是类中的一个特殊的方法,只有在类被实例化的时候会被调用,而且只被调用一次,这个方法不能被外部访问到,只有在实例化的时候被调用一次

```js
class Person {
    constructor(){
        consoloe.log("haha")
    }
    public name;
    public eat(){
        console.log("is eating")
    }
}
var p1 = new Person()
p1.name = "batman"
p1.eat()
var p2 = new Person()
p2.name = "superman"
p2.eat()
//p2.constructor() ,不能在类的外部访问
//打印结果
/*
haha
batman
haha
superman
*/
```

希望在实例化一个人的时候,必须为它指定一个名字

```js
class Person {
    constructor(public name:string){
    }
    public eat(){
        console.log(this.name)
    }
}
// var p1 = new Person()
// p1.name = "batman"
// p1.eat() 
//上面的写法会报错,因为在实例化的时候,必须要有名字
var p1 = new Person("batman")
p1.eat() 
```

注意:在构造函数中一定要明确写出访问控制符,如果没有写 public,那么就是在类里面没有声明name属性,那么在eat方法中是不能打印出name的

##### 5.1.4类的继承

extends: 用来声明一种继承关系, 一个类继承了另一个类,那么就继承了他的所有的属性和方法 , 然后在新的类中还可以声明自己的属性和方法

```js
class Person {
    constructor(public name:string){
    }
    public eat(){
        console.log(this.name)
    }
}
//继承这个类
class Employee extends Person{
    code : string 
    work(){
        
    }
}
var e1 = new Employee("name")
e1.eat()
e1.code = "hhh"
e1.work()
```



super : 用来调父类的构造函数

```js
class Person {
    constructor(public name:string){
    }
    public eat(){
        console.log(this.name)
    }
}
//继承这个类
class Employee extends Person{
    //在实例化员工的时候必须指定工号
    constructor(public code:string){
        //这里会报错,因为子类的构造函数必须调用父类的构造函数,必须用super
        super(name)
        this.code = code
    }
    work(){
        
    }
}
var e1 = new Employee("name","11")
e1.eat()
e1.work()
```

super 关键字的第二个用法,用来调父类的其他的方法

```js
class Person {
    constructor(public name:string){
    }
    public eat(){
        console.log("eating")
    }
}
//继承这个类
class Employee extends Person{
    //在实例化员工的时候必须指定工号
    constructor(public code:string){
        //这里会报错,因为子类的构造函数必须调用父类的构造函数,必须用super
        super(name)
        this.code = code
    }
    work(){
        //先调用父类中的方法
        super.eat()
        this.dowork()
    }
    private dowork(){
        console.log("working")
    }
}
var e1 = new Employee("name","11")
e1.work()
```

#### 5.2 泛型

参数化的类型,一般用来限制集合的内容

```js
class Person {
    constructor(public name:string){
    }
    public eat(){
        console.log("eating")
    }
}
//继承这个类
class Employee extends Person{
    constructor(public code:string){
        super(name)
        this.code = code
    }
    work(){
        super.eat()
        this.dowork()
    }
    private dowork(){
        console.log("working")
    }
}
var workers:Array<Person> = []
//规定了workers这个数组中只能放Person类型的数据
workers[0] = new Person("zhangsan")
workers[1] = new Employee("lili","22")
workers[2] = 23 //报错,不是Person的类型
```

#### 5.3 接口 (Interface)

用来建立某种代码约定,是的其他开发者在调用某个方法或者创建新的类时必须遵循接口所定义的代码约定

第一种使用方法是用来声明某种属性

```js
interface IPerson{
    name:string
    age:number
}
class Person{
	//接口的第一种用法:作为方法的参数的类型声明
    constructor(public config:IPerson){
        
    }
}
//在实例化Person的时候,必须传入一个对象,这个对象中必须有name 和 age , 否则会报错,多传或者少传都会报错
var p1 = new Person({
    name:"zhangsan"
    age:18
})
```

第二个用法是用接口来声明方法

当一个类实现一个接口的时候,这个类中必须有这个类中的属性和方法

```js
interface Animal{
    eat()
}
class Sheep implements Animal{
    eat(){
        console.log("eating")
    }
}
```

#### 5.4 模块

模块可以帮助开发者将代码分割为可重用的单元,开发者可以自己决定自己将模块中的哪些资源(类,方法,变量)暴露出去工外部使用,哪些资源只能在模块内使用

一个文件就是一个模块,一个模块中有两个关键字,export 导出 ; import 导入

```js
// a.ts 文件中:声明对外暴露的变量,方法和类,以及不对外变量的变量,方法和类
export var prop1;
var prop2;
export function func1 (){}
function func2 (){}
export class Class1 {
    
}
class Class2 {
    
}
```

```js
// b.ts 文件中,可以先导入,再使用
import {prop1,func1,Class1} from './a'
console.log(prop1)
func1()
new Class1()
```

#### 5.5注解

注解为程序的元素(类,方法,变量)加上更直观更明了的说明,这些说明信息与程序的业务逻辑无关,而是工指定的工具或框架使用的



