import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TransferdetailsModule { 
  TransactionID:string;
  Acc_No:number;
  Ben_AccNo:number;
  Transaction_Type:string;
  Transaction_date:string;
  Maturity_Ins:string;
  Remark:string;
  Amount:number;
  status:string;
  Balance:number;
}
