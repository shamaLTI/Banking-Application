import { Component, OnInit } from '@angular/core';
import{AdminService} from '../../services/admin.service';
import{TransactionModule} from '../../modules/transaction/transaction.module';
import {SummaryModule} from 'src/app/modules/summary/summary.module';
@Component({
  selector: 'app-accountsummary',
  templateUrl: './accountsummary.component.html',
  styleUrls: ['./accountsummary.component.css']
})
export class AccountsummaryComponent implements OnInit {
Acc_No:number=parseInt(sessionStorage.getItem('ACC_NO'));
svc:AdminService;
tran : TransactionModule[];
sum:SummaryModule[];
  constructor(svc:AdminService) {
    this.svc=svc;
   }

  ngOnInit(): void {
    this.svc.Get_Trans(this.Acc_No).subscribe((data:TransactionModule[])=>{
      this.tran=data;
    });
    this.svc.GetSummaryDetails(this.Acc_No).subscribe((data:SummaryModule[])=>{
      this.sum=data;
    });

  }
}
