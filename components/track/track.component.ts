import { Component, OnInit,NgZone } from '@angular/core';
import {RegisterinfoModule} from '../../modules/registerinfo/registerinfo.module';
import {RegisterService} from '../../services/register.service';
import {Router} from '@angular/router';
import {FormsModule,NgForm,FormGroup} from '@angular/forms';
import { observable } from 'rxjs';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  
  svc1:RegisterService;
  reg= new RegisterinfoModule();
  ngzone:NgZone;
  router:Router;
  model:any=[];

  constructor(svc1:RegisterService,ngzone:NgZone,router:Router) 
    { 
    this.svc1=svc1;
    this.router=router;
    this.ngzone=ngzone;
  }

  Acc_No:number;
  reference_id:string;
  ngOnInit(): void {
    
  }

  TrackStatus(formt : NgForm) : void{
    console.log(formt.value);
    this.reference_id = formt.value.track;
    this.svc1.TrackRefID(this.reference_id).subscribe((data:string)=>{
      if(data!="null")
        alert("Your Account status is: " +data);
      else
        alert(data);
    });
  }
}