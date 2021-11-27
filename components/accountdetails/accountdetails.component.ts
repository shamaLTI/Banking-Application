import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {RegisterinfoModule} from '../../modules/registerinfo/registerinfo.module';

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.css']
})
export class AccountdetailsComponent implements OnInit {
Acc_No:number = parseInt(sessionStorage.getItem('ACC_NO'));
// Fname:string= "Shanay Birla";
// Mob_No:number= 122676787879;
// Email:string="abc@gmail.com";
// Aadhar_No: number=123456789012;
P_Address1:string 
// AccountType: string ="Savings";
svc:AdminService;
reg: RegisterinfoModule[];


  constructor(svc:AdminService) { 
    this.svc = svc;
  }

  ngOnInit(): void {
    this.svc.Get_Profile(this.Acc_No).subscribe((data:RegisterinfoModule[])=>{
      this.reg=data;
    });
  }

}
