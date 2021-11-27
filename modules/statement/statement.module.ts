import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class StatementModule { 
  TransactionID : string;
  Acc_No : number;
  Ben_AccNo :number;
  Transaction_Type:string;
  Transaction_date : string;
  Balance :number;
  Ben_Name :string;
  Withdraw : number;
  Deposit : number;
  
}
