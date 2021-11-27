using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bankz.Models
{
    public class usersummary
    {
        public int Acc_No { get; set; }
        public string Title { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public decimal Balance { get; set; }
        public Nullable<System.DateTime> Session_Login { get; set; }
    }
}