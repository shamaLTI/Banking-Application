import { Component, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminModule } from 'src/app/modules/admin/admin.module';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-adminresetpass',
  templateUrl: './adminresetpass.component.html',
  styleUrls: ['./adminresetpass.component.css']
})
export class AdminresetpassComponent implements OnInit {
svc : AdminService;
ngzone:NgZone;
router:Router;
ad = new AdminModule();
admin:any=[];
l_pass:string;
c_pass:string;
  constructor(svc:AdminService, ngzone:NgZone, router:Router) {this.svc=svc; this.ngzone=ngzone,this.router=router; }

  ngOnInit(): void {
  }

  Reset(resetform:NgForm):void{
    this.ad.PSNo = resetform.value.psno;
    this.ad.Admin_Password = resetform.value.loginPassword;
    this.l_pass = resetform.value.loginPassword;
    this.c_pass=resetform.value.confirmLogin;
    if(this.l_pass != this.c_pass)
    {
      alert("The entered passwords does not match");
    }
    else {
    this.svc.ResetPassword_Admin(this.ad.PSNo, this.ad.Admin_Password).subscribe((data:string)=>{
      alert(data);
      this.ngzone.run(()=>this.router.navigateByUrl('/adminlogin'));
    });
  }
  }
}
