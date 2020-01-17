/**
 * 将请求进行封装, 设置请求头
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class YjsHttpClientService {

  constructor(
    private http:HttpClient,
  ) { }

  /** 
   * 重新定义 get 请求
   */
  // public Get(url:string , myheader?:any):Observable<any>{
  //   return this.http.get(url,{headers:this.setHeader()}).pipe(
  //     retry(0), //请求次数
  //     catchError(this.handleError(''))
  //   )
  // }

  // setHeader(myheaders?:any):HttpHeaders{
  //   let HeadersConfig = myheaders
  //   if(myheaders == null){
  //     HeadersConfig = {
  //       'Content-Type':'application/json',
  //       'Accpet':'application/json'
  //     }
  //   }
  // }
  // handleError(a){}
}
