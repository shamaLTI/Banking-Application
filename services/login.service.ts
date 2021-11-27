import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observer} from 'rxjs';
import {LogininfoModule} from '../modules/logininfo/logininfo.module';
import {Observable} from 'rxjs/internal/observable';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
log:LogininfoModule;
http:HttpClient;
url:string='http://localhost:62201/api/RegisterAPI';
httpOptions={headers : new HttpHeaders({
  'Content-Type':'application/json'
})
}
  constructor(http:HttpClient) {
    this.http =http;
   }

   Login(name:string,pwd:string):Observable<string>{
    return this.http.get<string>(this.url+"/"+"Login"+"/"+name+"/"+pwd);
  }
  Logout(id:string):Observable<string>{

    return this.http.get<string>(this.url+"/Logout/"+id,this.httpOptions);

  }
  ResetPassword(Acc_No:number,Login_Pass:string,Tran_Pass:string):Observable<string>{
    return this.http.get<string>(this.url+"/ResetPassByAccNo/"+Acc_No+"/"+Login_Pass+"/"+Tran_Pass,this.httpOptions);
    }
    ResetPasswordByID(User_id:string,Login_Pass:string,Tran_Pass:string):Observable<string>{
    return this.http.get<string>(this.url+"/ResetPassByID/"+User_id+"/"+Login_Pass+"/"+Tran_Pass,this.httpOptions);
    }
    GenerateOTP(Acc_No:number):Observable<string>{
      return this.http.get<string>(this.url+"/GenerateOTP/"+Acc_No,this.httpOptions);
    }
    Get_Userid(Acc_No:number):Observable<boolean>{
      return this.http.get<boolean>(this.url+"/"+ "ForgotUserID" +"/"+ Acc_No, this.httpOptions );
    }

  }
