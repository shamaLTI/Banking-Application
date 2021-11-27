import { Component, OnInit,ViewEncapsulation,NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AdminService} from '../../services/admin.service';
import {LogininfoModule} from '../../modules/logininfo/logininfo.module'
import {timer} from 'rxjs';
import{Router} from '@angular/router';
import{LoginService} from '../../services/login.service';
@Component({
  selector: 'app-transotp',
  templateUrl: './transotp.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./transotp.component.css']
})
export class TransotpComponent implements OnInit {
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
        this.timeLeft = 60;
        alert("Session Timed Out..!! Kindly Regenerate OTP..!!");
        this.pauseTimer();
        this.Code="";
        this.ngzone.run(()=>this.router.navigateByUrl('/userdashboard'));
      }
    },1000)
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  svc: AdminService;
  log= new LogininfoModule;
  router:Router;
  ngzone:NgZone;
  svc1:LoginService;
  constructor(svc: AdminService,router:Router,ngzone:NgZone, svc1:LoginService, private modalService: NgbModal) 
  { this.svc=svc;
    this.router=router;
    this.ngzone=ngzone;
    this.svc1=svc1;
  }
  model:any=[];
  
  ngOnInit(): void {
    this.Acc_No=parseInt(sessionStorage.getItem('ACC_NO'));
    document.getElementById("slip").setAttribute("disabled","disabled");

      this.svc1.GenerateOTP(this.Acc_No).subscribe((data:string)=>
      {
        if(data=="false"){
          alert("Error Occurred");
        }
        else{
          this.Code=data;
          alert("OTP sent successfully");
          this.startTimer();

          }
      });
  }
  Acc_No:number;
  Code=sessionStorage.getItem('ACC_NO');
  OTP_User:string;
  Tran_ID=sessionStorage.getItem('TRAN_ID');
  Remark:string=sessionStorage.getItem('REMARKS');
  Mode:string=sessionStorage.getItem('MODE');
  Amount:string=sessionStorage.getItem('AMOUNT');
  Dat:string=sessionStorage.getItem('DATE');
  BenNo:string=sessionStorage.getItem('BEN_NO');

count:number=0;
  
  OTP_check(form1:NgForm){
    this.OTP_User=form1.value.OTP_NO;
    if(this.count<3)
    {
      if(this.OTP_User==this.Code)
      {
      //this.count++;
        this.svc.FundsSuccess(this.Tran_ID).subscribe((data:boolean)=>{
        if (data==true){
          alert("Successful");
          this.pauseTimer();
          document.getElementById("slip").removeAttribute("disabled");
        }
        else{
          alert("Transaction was not successful..!! Kindly try again after some time.");
          this.pauseTimer();
          this.ngzone.run(()=>this.router.navigateByUrl('/userdashboard'));
        }
        //sessionStorage.removeItem('ACC_NO');
        });
      }
      else
      {
      this.count++;
      alert("Invalid OTP. "+(3-this.count)+" Attempts left. Re-enter Correct OTP.");
      console.log(this.count);
      }  
    }
    else{
        alert("You have Exceeded the no of attemps. Transaction failed.");
        this.svc.FundsFailed(this.Tran_ID).subscribe((data:boolean)=>{
            alert("Transaction was not successful..!! Kindly try again after some time.");
            this.pauseTimer();
            this.ngzone.run(()=>this.router.navigateByUrl('/userdashboard'));
        });
    }
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}










 