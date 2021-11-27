import { Component, OnInit,NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import{Router} from '@angular/router';
import{LoginService} from '../../services/login.service';
import {LogininfoModule} from '../../modules/logininfo/logininfo.module';
import{timer} from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
svc:LoginService;
ngzone:NgZone;
router:Router;
OTP_User:string;
Code: string;
acc_no:number;
login_pass:string;
trans_pass:string;
model:any=[];
timeLeft: number = 60;
interval;
subscribeTimer: any;
observableTimer() {
  const source = timer(1000, 2000);
  const abc = source.subscribe(val => {
    console.log(val, '-');
    this.subscribeTimer = this.timeLeft - val;
  });
}
startTimer() {
  this.interval = setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft--;
    } else {
      //this.timeLeft = 60;
      alert("Session Timed Out..!! Kindly Regenerate OTP..!!");
      this.pauseTimer();
      this.Code="";
      this.ngzone.run(()=>this.router.navigateByUrl('/login'));
    }
  },1000)
}
pauseTimer() {
  clearInterval(this.interval);
}

  constructor(svc:LoginService, router:Router,ngzone:NgZone) {
    this.svc=svc;
    this.router=router;
    this.ngzone=ngzone;
   }
  ngOnInit(): void {          
    this.startTimer();
  }
  OTP_check(otpform:NgForm){
    this.Code=localStorage.getItem('OTP');
    this.acc_no=parseInt(localStorage.getItem('ACC'));
    this.login_pass=localStorage.getItem('LOGIN');
    this.trans_pass=localStorage.getItem('TRANSACT');

    this.OTP_User=otpform.value.OTP_NO;
    if(this.OTP_User==this.Code){
      alert("Successful");

      this.svc.ResetPassword (this.acc_no,this.login_pass,this.trans_pass).subscribe((data:string)=>
      {
        alert(data);
      });
      this.pauseTimer();
      this.ngzone.run(()=>this.router.navigateByUrl('/login'));

    }
    else{
      alert("Invalid OTP");
      // this.ngzone.run(()=>this.router.navigateByUrl('/login'));

    }
    
  }
}
