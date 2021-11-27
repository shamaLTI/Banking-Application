import { Component, ElementRef, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import {RegisterinfoModule} from '../../modules/registerinfo/registerinfo.module';
import {AdminService}from '../../services/admin.service';
import {FormsModule,NgForm,FormGroup} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{DatePipe} from '@angular/common';
@Component({
  selector: 'app-getallcustomersbyaccno',
  templateUrl: './getallcustomersbyaccno.component.html',
  encapsulation: ViewEncapsulation.None,

  styleUrls: ['./getallcustomersbyaccno.component.css']
})
export class GetallcustomersbyaccnoComponent implements OnInit {
svc:AdminService;
reg=new RegisterinfoModule();
// reg1:RegisterinfoModule;
model:any=[];
accno: number;
cus:any=[];
  constructor(svc:AdminService,private modalService: NgbModal,private datepipe:DatePipe) { 
    this.svc=svc;
    
  }
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
  
  ngOnInit(): void {
  }
  
  getcustomerbyaccno(getcustomer:NgForm):void{
    console.log(getcustomer.value);
    this.accno = getcustomer.value.accNo;
    this.svc.GetAllRegistrationsbyaccno(this.accno).subscribe((data:RegisterinfoModule)=>{
      this.Acc_No= data.Acc_No;
      this.Ref_ID= data.Ref_ID;
      this.Fname=data.Fname;
      this.Mname=data.Mname;
      this.Lname=data.Lname;
      this.MobNo=data.MobNo;
      this.Email=data.Email;
      this.Aadhar_No=data.Aadhar_No;
      this.DOB = this.datepipe.transform(data.DOB,'dd/MM/YYYY');
      console.log(this.DOB);
      this.P_Address1=data.P_Address1+","+data.P_Address2;
      // this.P_Address2=data.P_Address2;
      this.P_Landmark=data.Landmark;
      this.P_State=data.P_State;
      this.P_City=data.P_City;
      this.P_Pincode=data.P_Pincode;
      this.OccupationType=data.OccupationType;
      this.Src_Income=data.Src_Income;
      this.GrossAnnual_Income=data.GrossAnnual_Income;
      this.DebitCard=data.DebitCard;
      this.NetBanking=data.NetBanking;
      this.AccountType=data.AccountType;
      this.Branch_Name=data.Branch_Name;
    }) ;
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  
  }
  UpdateCustomer():void{
    this.reg.Acc_No=this.Acc_No;
    this.Ref_ID=this.Ref_ID;
    this.reg.Fname= this.Fname;
    this.reg.Lname=this.model.Lname;
    this.reg.Mname=this.model.Mname;
    this.reg.MobNo=this.model.MobNo;
    this.reg.Email=this.model.Email;
    this.reg.Aadhar_No=this.model.Aadhar_No;
    this.reg.DOB=this.model.DOB;
    this.reg.P_Address1=this.model.P_Address1;
    this.reg.P_Landmark=this.model.P_Landmark;
    this.reg.P_State=this.model.P_State;
    this.reg.P_City=this.model.P_City;
    this.reg.P_Pincode=this.P_Pincode;
    this.reg.OccupationType=this.model.OccupationType;
    this.svc.UpdateCustomer(this.reg.Acc_No,this.reg).subscribe((data:boolean)=>{
      console.log(data);
      if(data==true){
        alert(" Updated");}
    })


  }
  }
