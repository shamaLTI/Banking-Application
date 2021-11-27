import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {IfscModule} from '../../modules/ifsc/ifsc.module';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-insert-branch',
  templateUrl: './insert-branch.component.html',
  styleUrls: ['./insert-branch.component.css']
})
export class InsertBranchComponent implements OnInit {
model:any=[];
svc:AdminService;
ifsc= new IfscModule();
branchName:string;
ifscCode:string;
  constructor(svc:AdminService) { 
    this.svc=svc;
  }

  ngOnInit(): void {
  }
  InsertBranch(branchform: NgForm):void{
      console.log(branchform.value);
      this.ifsc.Branch_Name=this.model.branchname;
      this.ifsc.IFSC_code=this.model.IFSC_Code;
      console.log(this.ifsc)
      this.svc.AddBranch(this.ifsc).subscribe((data:boolean)=>{
        console.log(data);
        if(data == true)
        {
          alert("Branch Details Added Successfully");
        }
        else{
          alert("Error Occured");
        }

      });
  }
}
