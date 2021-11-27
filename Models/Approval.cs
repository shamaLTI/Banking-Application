using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bankz.Models
{
    public class Approval
    {
        public int Acc_No { get; set; }
        public string Ref_ID { get; set; }
        public string Title { get; set; }
        public string Fname { get; set; }
        public string Mname { get; set; }
        public string Lname { get; set; }
        public long MobNo { get; set; }
        public string Email { get; set; }
        public long Aadhar_No { get; set; }
        public System.DateTime DOB { get; set; }
        public string AddressL1 { get; set; }
        public string AddressL2 { get; set; }
        public string Landmark { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Pincode { get; set; }
        public string P_Address1 { get; set; }
        public string P_Address2 { get; set; }
        public string P_Landmark { get; set; }
        public string P_City { get; set; }
        public string P_State { get; set; }
        public int P_Pincode { get; set; }
        public string OccupationType { get; set; }
        public string Src_Income { get; set; }
        public decimal GrossAnnual_Income { get; set; }
        public string DebitCard { get; set; }
        public string NetBanking { get; set; }
        public string AccountType { get; set; }
        public string Branch_Name { get; set; }
        public string Status { get; set; }
    }
}