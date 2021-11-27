import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import{RegisterinfoModule} from '../../modules/registerinfo/registerinfo.module';
import{AdminService} from '../../services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{DatePipe} from '@angular/common';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  encapsulation: ViewEncapsulation.None,

  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
svc:AdminService;
reg:RegisterinfoModule[];

  Acc_No: number;
  Ref_ID: string;
  Title : string;
  Fname: string;
  Mname: string;
  Lname : string;
  MobNo: number ;
  Email :string;
  Aadhar_No:number;
  DOB : string;
  AddressL1:string;
  AddressL2 : string;
  Landmark: string;
  City : string;
  State : string;
  Pincode :number;
  P_Address1:string;
  P_Address2:string;
  P_Landmark: string;
  P_City : string;
  P_State : string;
  P_Pincode :number;
  OccupationType : string;
  Src_Income : string;
  GrossAnnual_Income : string;
  DebitCard : string;
  NetBanking : string;
  AccountType : string;
  Branch_Name : string;
  Status: string;

  constructor(svc:AdminService,private modalService: NgbModal,private datepipe:DatePipe) 
  {
    this.svc=svc;

  }

  ngOnInit(): void {
console.log(this.datepipe.transform(Date(),'dd/MM/YYYY'));
  this.svc.GetAllRegistrationsbyStatus().subscribe((data:RegisterinfoModule[])=>{
    this.reg=data;
    console.log(this.reg);

  });
}

  openScrollableContent(longContent,item) {
  this.modalService.open(longContent, { scrollable: true });
console.log(item);

this.Aadhar_No=item.Aadhar_No;
this.Acc_No =item.Acc_No;
this.Ref_ID=item.Ref_ID;
this.Fname=item.Fname;
this.Lname=item.Lname;
this.Mname=(item.Mname || '---');
this.Email=item.Email;
this.DOB = this.datepipe.transform(item.DOB,'dd/MM/YYYY');
// this.DOB=item.DOB;
this.P_Address1=item.P_Address1 + " , " +item.P_Address2;
this.P_City=item.P_City;
this.P_Landmark=(item.P_Landmark|| '---');
this.P_State=item.P_State;
this.P_Pincode=item.P_Pincode;
this.OccupationType=item.OccupationType;
this.Src_Income=item.Src_Income;
this.GrossAnnual_Income=item.GrossAnnual_Income;
this.NetBanking=item.NetBanking;
this.DebitCard=item.DebitCard;
this.AccountType=item.AccountType;
this.Branch_Name=item.Branch_Name;
this.MobNo=item.MobNo;
}
Approve(){
  this.svc.AdminApprovals(this.Acc_No).subscribe((data:boolean)=>{
    console.log(this.Acc_No);
console.log(data);
if(data ==true){
  alert("Approved");
  this.svc.GenerateApprovalMail(this.Acc_No).subscribe((data:boolean)=>{
    if(data == true){
            alert("Mail Sent Successfully");
    }
    else{
      alert("Error Occured");
    }
  });
}
else{
  alert("Error Occured");
}
this.modalService.dismissAll("Approved");
// this.ngzone.run(()=>this.router.navigateByUrl('/userinfo'));
window.location.reload();
  });
}
Reject(){
this.svc.AdminReject(this.Acc_No).subscribe((data:boolean)=>{
if(data==true){
  alert("Rejected");
}
else 
{
  alert("Error Occured");
}
this.modalService.dismissAll("Rejected");

window.location.reload();
});
}
}

