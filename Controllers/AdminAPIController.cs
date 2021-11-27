using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Bankz.Models;
using System.Web.Http.Cors;
using System.Data;
using System.Data.SqlClient;
using System.Net.Mail;

namespace Bankz.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [Route("api/AdminAPI")]
    public class AdminAPIController : ApiController
    {
        BankEntities db = new BankEntities();

        [Route("api/AdminAPI/Login/{name}/{pwd}")]
        [HttpGet]
        public string Get(int uid, string pwd)
        {
            string result = "";
            try
            {
                var data = db.UserAccounts.Where(x => x.Acc_No== uid && x.Login_Password == pwd);
                if (data.Count() == 0)
                    result = "Invalid Credentials";
                else
                    result = "Login Successfull";
            }
            catch (Exception e)
            {
                throw e;
            }
            //Console.Write(result);
            return result;
        }

        [Route("api/AdminAPI/GetAllRegistrationsbyStatus")]
        [HttpGet]
        public IEnumerable<Approval> Get()
        {
            try
            {
                var data = from ud in db.User_Details.Where(x => x.Status == "Waiting for Approval")
                           select new Approval
                           {
                               Acc_No = ud.Acc_No,
                               Ref_ID = ud.Ref_ID,
                               Fname = ud.Fname,
                               Lname = ud.Lname,
                               Status = ud.Status,
                               Aadhar_No = ud.Aadhar_No,
                               Mname = ud.Mname,
                               MobNo = ud.MobNo,
                               Email = ud.Email,
                               DOB = ud.DOB,
                               P_Address1 = ud.AddressL1,
                               P_Address2 = ud.P_Address2,
                               P_City = ud.P_City,
                               P_Landmark = ud.P_Landmark,
                               P_State = ud.P_State,
                               P_Pincode = ud.P_Pincode,
                               Branch_Name = ud.Branch_Name,
                               AccountType = ud.AccountType,
                               DebitCard = ud.DebitCard,
                               NetBanking = ud.NetBanking,
                               OccupationType = ud.OccupationType,
                               Src_Income = ud.Src_Income,
                               GrossAnnual_Income = ud.GrossAnnual_Income
                           };
                return data;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /*  [Route("api/AdminAPI/UpdateStatus/{id}")]
          [HttpPut]
          public bool Put(int id, [FromBody] User_Details newsts)
          {
              try
              {
                  var olddata = db.User_Details.Where(x => x.Acc_No == id).SingleOrDefault();
                  if (olddata == null)
                      throw new Exception("Invalid Data");
                  else
                  {
                      olddata.A_Status = .EmpID;
                      olddata.EmpName = newemp.EmpName;
                      olddata.Desg = newemp.Desg;
                      olddata.Dept = newemp.Dept;
                      olddata.Salary = newemp.Salary;
                      olddata.password = newemp.password;
                      olddata.projid = newemp.projid;
                      var res = db.SaveChanges();
                      if (res > 0)
                          return true;
                  }
              }
              catch (Exception e)
              {
                  throw e;
              }
              return false;
          }*/
        [Route("api/AdminAPI/GetAllRegistrations")]
        [HttpGet]
        public IEnumerable<User_Details> Getcustomers()
        {
            try
            {
                return db.User_Details.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/AdminAPI/GetAllRegistrationsbyaccno/{accno}")]
        [HttpGet]
        public User_Details Get(int accno)
        {
            try
            {
                var data = db.User_Details.Where(x => x.Acc_No == accno).SingleOrDefault();
                if (data == null)
                    throw new Exception("Invalid Data");
                else
                    return data;
            }
            catch (Exception e)
            {
                throw e;
            }
        }



        [Route("api/AdminAPI/AdminApprovals/{Acc_No}")]
        [HttpPut]
        public bool Get_Approval(int Acc_No)
        {
            try
            {
                var res = db.sp_Admin_Approve(Acc_No);
                if (res > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        [Route("api/AdminAPI/AdminReject/{Acc_No}")]
        [HttpPut]
        public bool Get_Rejection(int Acc_No)
        {
            try
            {
                var res = db.sp_Admin_Reject(Acc_No);
                if (res > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/AdminAPI/AddBranch")]
        [HttpPost]
        public bool Post_Branch([FromBody] IFSC ifsc)
        {
            db.IFSCs.Add(ifsc);
            var res = db.SaveChanges();
            if (res > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [Route("api/AdminAPI/Get_IFSC")]
        [HttpGet]
        public IEnumerable<ifsccode> Get_IFSC()
        {
            try
            {
                var res = from i in db.IFSCs
                          select new ifsccode { Branch_Name = i.Branch_Name, IFSC_code = i.IFSC_code };
                return res;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Route("api/AdminAPI/Get_Ben/{accno}")]
        [HttpGet]
        public IEnumerable<Ben> Get_Ben(int accno)
        {
            try
            {
                var res = from i in db.Beneficiaries
                          where i.User_AccNo == accno
                          select new Ben
                          {
                              Ben_AccNo = i.Ben_AccNo,
                              User_AccNo = i.User_AccNo,
                              Ben_NickName = i.Ben_NickName,
                              Ben_Name = i.Ben_Name,
                              Ben_Banktype = i.Ben_Banktype,
                              IFSC_code = i.IFSC_code
                          };
                return res;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        [Route("api/AdminAPI/UpdateCustomer/{accno}")]
        [HttpPut]
        public bool Put(int accno, [FromBody] User_Details newuser)
        {
            try
            {
                var olddata = db.User_Details.Where(x => x.Acc_No == accno).SingleOrDefault();
                if (olddata == null)
                    throw new Exception("Invalid Data");
                else
                {
                    olddata.Acc_No = newuser.Acc_No;
                    olddata.Ref_ID = newuser.Ref_ID;
                    olddata.Fname = newuser.Fname;
                    olddata.Lname = newuser.Lname;
                    olddata.Mname = newuser.Mname;
                    olddata.MobNo = newuser.MobNo;
                    olddata.Email = newuser.Email;
                    olddata.Aadhar_No = newuser.Aadhar_No;
                    olddata.DOB = newuser.DOB;
                    olddata.Fname = newuser.Fname;
                    olddata.P_Address1 = newuser.P_Address1;
                    olddata.P_Landmark = newuser.P_Landmark;
                    olddata.P_State = newuser.P_State;
                    olddata.P_City = newuser.P_City;
                    olddata.P_Pincode = newuser.P_Pincode;
                    olddata.OccupationType = newuser.OccupationType;
                    olddata.Src_Income = newuser.Src_Income;
                    olddata.GrossAnnual_Income = newuser.GrossAnnual_Income;
                    olddata.DebitCard = newuser.DebitCard;
                    olddata.NetBanking = newuser.NetBanking;
                    olddata.AccountType = newuser.AccountType;
                    olddata.Branch_Name = newuser.Branch_Name;
                    var res = db.SaveChanges();
                    if (res > 0)
                        return true;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return false;
        }

        [Route("api/AdminAPI/Get_Profile/{accno}")]
        [HttpGet]
        public IEnumerable<Approval> Get_Profile(int accno)
        {
            try
            {
                var data = from ud in db.User_Details.Where(x => x.Acc_No == accno)
                           select new Approval
                           {
                               Acc_No = ud.Acc_No,
                               Ref_ID = ud.Ref_ID,
                               Fname = ud.Fname,
                               Lname = ud.Lname,
                               Status = ud.Status,
                               Aadhar_No = ud.Aadhar_No,
                               Mname = ud.Mname,
                               MobNo = ud.MobNo,
                               Email = ud.Email,
                               DOB = ud.DOB,
                               P_Address1 = ud.AddressL1,
                               P_Address2 = ud.P_Address2,
                               P_City = ud.P_City,
                               P_Landmark = ud.P_Landmark,
                               P_State = ud.P_State,
                               P_Pincode = ud.P_Pincode,
                               Branch_Name = ud.Branch_Name,
                               AccountType = ud.AccountType,
                               DebitCard = ud.DebitCard,
                               NetBanking = ud.NetBanking,
                               OccupationType = ud.OccupationType,
                               Src_Income = ud.Src_Income,
                               GrossAnnual_Income = ud.GrossAnnual_Income

                           };
                return data;
            }
            catch (Exception e)
            {
                throw e;
            }

        }


        [Route("api/AdminApi/TransferUpdate")]
        [HttpPost]
        public string Post_Transaction([FromBody] Transfer_Details_Withdraw tdw)
        {
            try
            {
                Random rand = new Random();
                string randomCode = (rand.Next(999999)).ToString();
                string Tran_ID = "TRAN" + randomCode;
                string date1 = tdw.Maturity_Ins?.ToString("yyyy/MM/dd h:mm");
                var res = db.sp_Transfer(Tran_ID, tdw.Acc_No, tdw.Ben_AccNo, tdw.Transaction_Type, date1, tdw.Remark, tdw.Amount);
                if (res > 0)
                {
                    return Tran_ID;
                }
                else
                {
                    return "Error";
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/AdminAPI/BalanceUpdateSuccess/{Tran_id}")]
        [HttpGet]
        public bool Get_BalSuccess(string Tran_id)
        {
            try
            {
                var res = db.sp_Balance_Update(Tran_id);
                if (res > 0)
                {
                    var data = db.Transfer_Details_Withdraw.Where(x => x.status == "Successful" && x.TransactionID == Tran_id).SingleOrDefault();
                    if (data != null)
                        return true;
                    else
                        return false;
                }
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [Route("api/AdminAPI/BalanceUpdateUnsuccess/{Tran_id}")]
        [HttpGet]
        public bool Get_BalUnsuccess(string Tran_id)
        {
            try
            {
                var res = db.sp_Balance_Update_Unsuccessful(Tran_id);
                if (res > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/AdminAPI/GetAllTrans/{Acc_No}")]
        [HttpGet]
        public IEnumerable<Transfer_Details_All> Get_Transactions(int Acc_No)
        {
            var data = db.Transfer_Details_All.Where(x => x.Acc_No == Acc_No).OrderByDescending
                (t => t.Transaction_date).Take(3);
            return data;
        }

        [Route("api/AdminAPI/Accountstatement/{Acc_No}/{startdate}/{enddate}")]
        [HttpGet]

        public IEnumerable<accountstatement> Get_Statement(int Acc_No, DateTime startdate, DateTime enddate)
        {
            //string startdate1=startdate.ToString("yyyy-MM-dd");
            DateTime enddate1=enddate.AddDays(1);
            try
            {
                var data = from t in db.Transfer_Details_All
                           join b in db.Beneficiaries on
                           t.Ben_AccNo equals b.Ben_AccNo
                           where t.Acc_No == Acc_No && t.Transaction_date >= startdate && t.Transaction_date <= enddate1
                           orderby t.Transaction_date descending

                           select new accountstatement
                           {
                               TransactionID = t.TransactionID,
                               Acc_No = t.Acc_No,
                               Ben_AccNo = t.Ben_AccNo,
                               Transaction_Type = t.Transaction_Type,
                               Transaction_date = t.Transaction_date,
                               Balance = t.Balance,
                               Ben_Name = b.Ben_Name,
                               Withdraw = t.Withdraw,
                               Deposit = t.Deposit,
                               status = t.status
                           };
                if (data.Count() == 0)
                    return null;
                else
                    return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [Route("api/AdminAPI/Sessionlogin/{Acc_No}")]
        [HttpGet]
        public bool SessionLogin(int Acc_No)
        {
            try
            {
                var data = db.sp_SessionLogin(Acc_No);
                if (data > 0)

                    return true;
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }

        [Route("api/AdminAPI/GetSummaryDetails/{Acc_No}")]
        [HttpGet]
        public IEnumerable<usersummary> Get_Summary(int Acc_No)
        {
            try
            {
                var res = new Session();
                var user = db.Sessions.Where(x => x.Acc_No == Acc_No);
                if (user.Count() == 1)
                {
                    res = db.Sessions.Where(x => x.Acc_No == Acc_No)
                    .OrderByDescending(t => t.Session_Login).Take(1).SingleOrDefault();
                }
                else
                {
                    res = db.Sessions.Where(x => x.Acc_No == Acc_No)
                   .OrderByDescending(t => t.Session_Login).Skip(1).Take(1).SingleOrDefault();
                }

                var data = from ud in db.User_Details
                           join ua in db.UserAccounts
                           on ud.Acc_No equals ua.Acc_No
                           where ud.Acc_No == Acc_No
                           select new usersummary
                           {
                               Acc_No = ud.Acc_No,
                               Title = ud.Title,
                               Fname = ud.Fname,
                               Lname = ud.Lname,
                               Balance = ua.Balance,
                               Session_Login = res.Session_Login

                           };
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/AdminAPI/MailDefaultPass/{Acc_No}")]
        [HttpGet]
        public bool Get_MailDetails(int Acc_No)
        {
            string receiver_mailid;
            var res = db.User_Details.Where(x => x.Acc_No == Acc_No).SingleOrDefault();
            var data = db.UserAccounts.Where(x => x.Acc_No == Acc_No).SingleOrDefault();



            if (res == null)
            {
                return false;
            }
            else
            {
                receiver_mailid = res.Email;
                string from, pass, messageBody, Code, to;
                Code = Acc_No.ToString();
                MailMessage message = new MailMessage();
                to = receiver_mailid;
                from = "reevafern161@gmail.com";
                pass = "ace123456789";
                messageBody = "Congratulations..!! Your Account is sucessfully created..!!\nYour Account No: " + Code + "\nUser ID: " + data.User_Id + "\nDefault Login Password: " + data.Login_Password + "\nKindly Login with default password and Reset your password.";
                message.To.Add(to);
                message.From = new MailAddress(from);
                message.Body = messageBody;
                message.Subject = "FinTech Bank Account Approved";
                SmtpClient smtp = new SmtpClient("smtp.gmail.com");
                smtp.EnableSsl = true;
                smtp.Port = 587;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Credentials = new NetworkCredential(from, pass);
                try
                {
                    smtp.Send(message);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        [Route("api/AdminAPI/Get_AllTransactions")]
        [HttpGet]
        public IEnumerable<Transfer_Details_All> Get_AllTrans()
        {
            try
            {
                return db.Transfer_Details_All.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/AdminAPI/AdminLogin/{PSNo}/{password}")]
        [HttpGet]
        public string Get_Admin(int PSNo, string password)
        {
            try
            {
                //var res = db.sp_Admin_Login(PSNo, password).SingleOrDefault();
                //if (res == null)
                //{
                    var data = db.Admins.Where(x => x.PSNo == PSNo && x.Admin_Password == password).SingleOrDefault();
                    //if (data.Acc_Status == "Inactive")
                    //{
                    //    return "Your account has been locked. Kindly reset your password for reactivation";
                    //}
                    //else 
                    if (data==null)
                    {
                        return "Invalid Credentials";
                    }
                //}
                else
                   return "Login Successful";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/AdminAPI/AdminReset/{PSNo}/{password}")]
        [HttpGet]
        public string Get_Reset(int PSNo, string password)
        {
            try
            {
                var res = db.sp_Admin_Reset_Password(PSNo, password);
                if (res > 0)
                    return "Password Reset Successful. Kindly Login again..!";
                else
                    return "Invalid Credentials";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/AdminAPI/AdminLogout/{PSNo}")]
        [HttpGet]
        public string Get_Logout(int PSNo)
        {
            try
            {
                var res = db.sp_Admin_Logout(PSNo);
                if (res > 0)
                    return "You have successfully logged out..!! Best practice is to close the browser.";
                else
                    return "Invalid Credentials";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
