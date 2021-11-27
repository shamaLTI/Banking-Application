import { Component, OnInit } from '@angular/core';
import {TransferdetailsModule} from '../../modules/transferdetails/transferdetails.module';
import {AdminService} from '../../services/admin.service';
@Component({
  selector: 'app-admintransactions',
  templateUrl: './admintransactions.component.html',
  styleUrls: ['./admintransactions.component.css']
})
export class AdmintransactionsComponent implements OnInit {
svc:AdminService;
tran:TransferdetailsModule[];
  constructor(svc:AdminService) { 
    this.svc=svc;
  }

  ngOnInit(): void {

    this.svc.Get_AllTransactions().subscribe((data:TransferdetailsModule[])=>{
      this.tran=data;
      console.log(this.tran);
    });
  }

}
