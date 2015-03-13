using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class reset_password : MPPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string token = Request.QueryString["token"];
        if (token == null)
            token = "";

        var res = DB.SExecuteScalar("select email from reset_password where token=? and expire>?", token, DateTime.Now);
        if (res != null)
        {
            string email = (string)res;
            if(Request.Form["password"]!=null)
            {
                string password = Request.Form["password"];
                MPUser user = new MPUser(email);
                user.Password = Tools.SHA256Hash(password);
                Server.Transfer("~/MP_Views/reset-password/success.html");
            }
            else
            {
                MPData.token = token;
            }
        }
        else
        {
            Server.Transfer("~/MP_Views/public/link-failure.html");
        }
    }
}