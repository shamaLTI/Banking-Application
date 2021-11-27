import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router'; 
import {AdminService} from '../../services/admin.service';
import {AdminModule} from '../../modules/admin/admin.module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  
  svc:AdminService;
  admin = new AdminModule() ;
  ngzone:NgZone;
  router:Router;
  model:any=[];
  
  constructor(svc:AdminService, ngzone:NgZone,router:Router) { 
    this.svc=svc;
    this.ngzone=ngzone;
    this.router=router;
  }

  ngOnInit(): void {}

    RegisterData(loginform:NgForm): void{
      console.log(loginform.value);

      this.admin.PSNo = loginform.value.userid;

      this.admin.Admin_Password = loginform.value.password;
  
      sessionStorage.setItem('USERNAME', this.admin.PSNo.toString());
  
      this.svc.Login_Admin(this.admin.PSNo, this.admin.Admin_Password).subscribe((data: string) => {
  
        console.log(data);
        alert(data); 
        this.ngzone.run(() => this.router.navigateByUrl("/userinfo"));

  });
  }
}