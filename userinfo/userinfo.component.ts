import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router'; 
import{AdminService} from '../../services/admin.service';
import{AdminModule} from '../../modules/admin/admin.module'

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
svc:AdminService;
admin= new AdminModule();
router:Router;
ngzone:NgZone;
PSNo:number = parseInt(sessionStorage.getItem('USERNAME'));
  constructor(svc:AdminService,router:Router,ngzone:NgZone) { 
    this.svc=svc;
    this.ngzone=ngzone;
    this.router=router;
  }
  ngOnInit(): void { }
Logout():void{
  this.svc.Logout_Admin(this.PSNo).subscribe((data:string)=>{
    alert(data);
    this.ngzone.run(()=>this.router.navigateByUrl("/adminlogin"));
  });
}
}
