import { Component, OnInit,NgZone } from '@angular/core';
import {FormsModule, NgForm, FormGroup} from '@angular/forms';
import{RegisterService} from '../../services/register.service';
import{RegisterinfoModule} from '../../modules/registerinfo/registerinfo.module';
import {Router} from '@angular/router';
import {IfscModule} from '../../modules/ifsc/ifsc.module';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-openaccount',
  templateUrl: './openaccount.component.html',
  styleUrls: ['./openaccount.component.css']
})
export class OpenaccountComponent implements OnInit {
  customer : any = [];
  svc: RegisterService;
  svc1:AdminService;
  reg= new RegisterinfoModule();
  ifsc: IfscModule[];
  acc_no : number;
  ngzone: NgZone;
  router: Router;

  constructor(svc:RegisterService,svc1:AdminService, ngzone:NgZone, router:Router) {
    this.svc = svc;
    this.svc1 = svc1;
    this.ngzone=ngzone;
    this.router=router;
   }

  ngOnInit(): void {
    this.svc1.GetIfsc().subscribe((data:IfscModule[])=>{
      this.ifsc=data;
      console.log(this.ifsc);
    });
  }

  RegisterData(accountform : NgForm) : void
  {
    console.log(accountform.value);
    this.reg.Ref_ID=""
    this.reg.Title=this.customer.title;
    this.reg.Fname=this.customer.fname;
    this.reg.Mname=this.customer.mname;
    this.reg.Lname=this.customer.lname;
    this.reg.MobNo=this.customer.mobno;
    this.reg.Email=this.customer.email;
    this.reg.Aadhar_No=this.customer.aadhar;
    this.reg.DOB=this.customer.dob;
    this.reg.AddressL1=this.customer.address1;
    this.reg.AddressL2=this.customer.address2;
    this.reg.Landmark=this.customer.landmark;
    this.reg.City=this.customer.city;
    this.reg.State=this.customer.state;
    this.reg.Pincode=this.customer.pincode;
    this.reg.P_Address1=this.customer.permaAddress1;
    this.reg.P_Address2=this.customer.permaAddress2;
    this.reg.P_Landmark=this.customer.permalandmark;
    this.reg.P_City=this.customer.permacity;
    this.reg.P_State=this.customer.permastate;
    this.reg.P_Pincode=this.customer.permapincode;
    this.reg.OccupationType=this.customer.occType;
    this.reg.Src_Income=this.customer.income;
    this.reg.GrossAnnual_Income=this.customer.salary;
    this.reg.DebitCard=this.customer.atmcard;
    this.reg.NetBanking=this.customer.optNetBanking;
    this.reg.AccountType=this.customer.accType;
    this.reg.Branch_Name=this.customer.branchName;
    /////////////////////////////////////////////////
    // console.log(this.reg.PAL1,this.reg.PAL2,this.reg.Branch_Name, this.reg.A_Status);
   this.reg.Status="Waiting for Approval";
    //this.reg.Acc_No=1000002;
   
    this.svc.RegisterCustomer(this.reg).subscribe((data:number)=>

    {
     // alert(data);
      if(data!=0)
      {
        this.acc_no=data;
        alert("New Customer Registered");
        console.log( this.acc_no);
        // localStorage.setItem('ACC_NO',data.toString());
        // this.ngzone.run(()=>this.router.navigateByUrl('/track'));
        this.svc.GenerateRefID(this.acc_no).subscribe((data:string)=>{
          if(data!="Error Occurerd during RefID generation. Contact Admin for more details..")
          {
            alert("Your details have been sent for approval\n Your Ref ID is :  "+ data + "\n Please save it for tracking your Application " );
            // localStorage.removeItem('ACC_NO')
            this.ngzone.run(()=>this.router.navigateByUrl('/track'));

          }
          else{
            alert(data);
          }
        });
      }
      else{
        alert("ERROR");
      }
    });
 
  }

PermanentAddress(event)
{
    // this.customer.permaAddress.checked
    if(event.target.checked==true){
        this.customer.permaAddress1=this.customer.address1;
        this.customer.permaAddress2=this.customer.address2;
        this.customer.permalandmark=this.customer.landmark;
        this.customer.permastate=this.customer.state;
        this.customer.permacity=this.customer.city;
        this.customer.permapincode=this.customer.pincode; 
       }
       else if(event.target.checked==false)
      {
        this.customer.permaAddress1="";
        this.customer.permaAddress2="";
        this.customer.permalandmark="";
        this.customer.permastate="";
        this.customer.permacity="";
        this.customer.permapincode="";
      } 
       
}

}