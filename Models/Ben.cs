using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bankz.Models
{
    public class Ben
    {
        public int Ben_AccNo { get; set; }
        public int User_AccNo { get; set; }
        public string Ben_Name { get; set; }
        public string Ben_NickName { get; set; }
        public string Ben_Banktype { get; set; }
        public string IFSC_code { get; set; }
    }
}