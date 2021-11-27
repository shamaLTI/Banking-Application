import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import{BeneficiaryModule} from '../../modules/beneficiary/beneficiary.module';
import {RegisterService} from '../../services/register.service';
@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css']
})
export class BeneficiaryComponent implements OnInit {
model:any=[];
ben= new BeneficiaryModule();
svc: RegisterService;
  constructor(svc:RegisterService) { 
    this.svc=svc;
  }

  ngOnInit(): void {
    this.model.useraccno=sessionStorage.getItem('ACC_NO');
  }
RegisterData(beneficiary:NgForm):void{
  console.log(beneficiary.value);
  this.ben.Ben_AccNo=parseInt(beneficiary.value.BenaccNo);
  this.ben.User_AccNo=parseInt(sessionStorage.getItem('ACC_NO'));
  this.ben.Ben_Name=beneficiary.value.BenName;
  this.ben.Ben_NickName=beneficiary.value.BenNickname;
  this.ben.Ben_Banktype=beneficiary.value.bankType;
  this.ben.IFSC_code=beneficiary.value.IFSC;
  console.log(this.ben);

this.svc.InsertBen(this.ben).subscribe((data: boolean)=>{
  alert("Beneficiary Added Successfully");
});
  
}
}
