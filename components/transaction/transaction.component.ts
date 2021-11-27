import { Component, OnInit,NgZone } from '@angular/core';
import {BeneficiaryModule} from '../../modules/beneficiary/beneficiary.module';
import {AdminService} from '../../services/admin.service';
import { NgForm,FormsModule,FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import {TransferdetailsModule} from '../../modules/transferdetails/transferdetails.module';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
model:any=[];
ben : BeneficiaryModule[];
svc:AdminService;
tdm= new TransferdetailsModule();
ngzone:NgZone;
router:Router;
no:number;
Code:string;
Tran_ID:string;
maxDate:any;
  constructor(svc:AdminService,ngzone:NgZone,router:Router, private datepipe:DatePipe) {
    this.svc=svc;
    this.router=router;
    this.ngzone=ngzone;
   }
  ngOnInit(): void {
    this.model.accNo=parseInt(sessionStorage.getItem('ACC_NO'));
    this.svc.Get_Ben(this.model.accNo).subscribe((data:BeneficiaryModule[])=>{
      this.ben=data;
      
    });
    
  }
Transfer(transferform:NgForm):void{
  console.log(transferform.value);
  this.tdm.Acc_No=parseInt(sessionStorage.getItem('ACC_NO'));
  this.tdm.Ben_AccNo=transferform.value.BenaccNo;
  this.tdm.Transaction_Type=transferform.value.tranType;
  this.tdm.Maturity_Ins=transferform.value.maturity;
  this.tdm.Remark=transferform.value.remarks;
  this.tdm.Amount=transferform.value.amount;
  sessionStorage.setItem('BEN_NO',this.tdm.Ben_AccNo.toString());
  sessionStorage.setItem('MODE', this.tdm.Transaction_Type);
  sessionStorage.setItem('DATE',formatDate(new Date(),'dd/MM/YYYY hh:mm','en'));
  sessionStorage.setItem('REMARKS',this.tdm.Remark);
  sessionStorage.setItem('AMOUNT', this.tdm.Amount.toString());

  console.log(this.tdm.Amount);
  if(transferform.value.amount<=0 )
  alert("Enter Appropriate Amount");
  
  else if ( transferform.value.amount >200000)
  {
      alert("Enter Appropriate Amount");
  }
  else
  {
 
  this.svc.FundsTransfer(this.tdm).subscribe((data:string)=>
  {
    sessionStorage.setItem('TRAN_ID',data);
    console.log(data);
        if(data=="Error"){
          alert("Error"+data);
        }
        else{
          console.log(this.no);
          alert("Redirecting to OTP page...!!Do not press Back or Refresh Button..!!");
          this.ngzone.run(()=>this.router.navigateByUrl('/transotp'));
        }
  });
}
}
}
