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
    
    public partial class sp_Login_Result
    {
        public int Acc_No { get; set; }
        public string User_Id { get; set; }
        public string Login_Password { get; set; }
        public string Transaction_Password { get; set; }
        public decimal Balance { get; set; }
        public string Acc_Status { get; set; }
        public Nullable<int> Login_Attempts { get; set; }
    }
}
