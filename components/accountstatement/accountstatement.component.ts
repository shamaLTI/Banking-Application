import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import{AdminService}from '../../services/admin.service';
import{StatementModule} from '../../modules/statement/statement.module';
import {SummaryModule} from '../../modules/summary/summary.module';

@Component({
  selector: 'app-accountstatement',
  templateUrl: './accountstatement.component.html',
  styleUrls: ['./accountstatement.component.css']
})
export class AccountstatementComponent implements OnInit {
user:any=[];
svc: AdminService;
statement: StatementModule[];
startdate: string;
enddate: string;
sum:SummaryModule[];
// minDate = new Date();
Acc_No:number= parseInt(sessionStorage.getItem('ACC_NO'));
  constructor(svc:AdminService) { 
    this.svc=svc;
  }

  ngOnInit(): void {
  this.svc.GetSummaryDetails(this.Acc_No).subscribe((data:SummaryModule[])=>{
        this.sum=data;
  });
  }
  getstatement(statementform: NgForm):void{
this.startdate=statementform.value.startdate;
this.enddate=statementform.value.enddate;
console.log(this.startdate);
    this.svc.Get_statement(this.Acc_No, this.startdate,this.enddate).subscribe((data:StatementModule[])=>{
      console.log(data);
      if(data==null){
        alert("No transaction records found for specified dates");
      }
      else{
      this.statement=data;
      
      }
    });
  }
}
