import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import {RegisterinfoModule} from '../../modules/registerinfo/registerinfo.module';
import {AdminService} from '../../services/admin.service';
@Component({
  selector: 'app-getallcustomerss',
  templateUrl: './getallcustomerss.component.html',
  styleUrls: ['./getallcustomerss.component.css']
})
export class GetallcustomerssComponent implements OnInit {
svc:AdminService;
reg: RegisterinfoModule[];
  constructor(svc:AdminService) {
    this.svc=svc;
   }

  ngOnInit(): void {
    this.svc.GetAllRegistrations().subscribe((data:RegisterinfoModule[])=>{
      this.reg=data;
      console.log(this.reg);
    });
  }

}
