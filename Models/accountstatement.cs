using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bankz.Models
{
    public class accountstatement
    {
        public string TransactionID { get; set; }
        public int Acc_No { get; set; }
        public int Ben_AccNo { get; set; }
        public string Transaction_Type { get; set; }
        public System.DateTime Transaction_date { get; set; }
        public Nullable<decimal> Withdraw { get; set; }
        public Nullable<decimal> Deposit { get; set; }
        public Nullable<decimal> Balance { get; set; }
        public string Ben_Name { get; set; }

        public string status { get; set; }
    }
}