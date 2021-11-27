import { Component, OnInit,NgZone } from '@angular/core';
import {FormsModule, NgForm, FormGroup} from '@angular/forms';
import{LoginService} from '../../services/login.service';
import{LogininfoModule} from '../../modules/logininfo/logininfo.module';
import {Router}from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})

export class ResetpasswordComponent implements OnInit {
  svc:LoginService;
  ngzone:NgZone;
  router:Router;
  constructor(svc: LoginService, router:Router,ngzone:NgZone){
    this.svc=svc;
    this.router=router;
    this.ngzone=ngzone;
  }
  admin:any=[];
  ngOnInit(): void {
  }
  Acc_No:number;
  
  ForgotPass(forgotPassword:NgZone):void{
    this.Acc_No=this.admin.userid;
    this.svc.Get_Userid(this.Acc_No).subscribe((data:boolean)=>{
      if(data == true)
     { alert("User Id has been sent to your registered Email Id");
     this.ngzone.run(()=>this.router.navigateByUrl("/login"));
    }
      else 
      alert("Error Occured. Please Contact Admin");
    });
  }
  
}