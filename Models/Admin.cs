//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Bankz.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Admin
    {
        public int PSNo { get; set; }
        public string AdminName { get; set; }
        public string Admin_Password { get; set; }
        public long Contact_No { get; set; }
        public string AdminEmail { get; set; }
        public string Acc_Status { get; set; }
        public Nullable<int> Login_Attempts { get; set; }
    }
}
