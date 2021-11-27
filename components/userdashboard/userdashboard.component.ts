import { Component, OnInit , NgZone} from '@angular/core';
import{FormsModule,NgForm, FormGroup} from '@angular/forms';
import{LoginService} from '../../services/login.service';
import{LogininfoModule} from '../../modules/logininfo/logininfo.module';
import { Router } from '@angular/router';
import {AdminService} from '../../services/admin.service';
import { SummaryModule} from '../../modules/summary/summary.module';
import { RegisterService } from 'src/app/services/register.service';
@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
 svc: LoginService;  
log= new LogininfoModule; 
ngzone: NgZone;
router:Router;
sum:SummaryModule[];
svc1:AdminService;
svc2:RegisterService;
constructor(svc: LoginService, svc1: AdminService, router:Router, ngzone:NgZone, svc2:RegisterService) 
{​​ 
  this.svc=svc;
  this.svc1=svc1;
  this.svc2=svc2;
  this.router=router;
  this.ngzone=ngzone;
}​​  
model:any=[]; 
accno:number=parseInt(sessionStorage.getItem('ACC_NO'));
 ngOnInit(): void {​​ this.svc1.GetSummaryDetails(this.accno).subscribe((data:SummaryModule[])=>{
  this.sum=data;
});
}​​ 

 id:string; 
Logout(form:NgForm)
{​​    this.id=sessionStorage.getItem('USERNAME'); 
 this.svc.Logout(this.id).subscribe((data:string)=> 
{​​ console.log(data);
  if(data!=null)       
   {alert(data);   
  this.ngzone.run(()=>this.router.navigateByUrl("login"));
  }
  else  
      alert(data);  
  }​​);   
 sessionStorage.removeItem('USERNAME');
 sessionStorage.removeItem('ACC_NO');
 }​​
}
