using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class user_aspx : MPPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string sub1 = RouteData.Values["sub1"] == null ? "" : RouteData.Values["sub1"] as string;
        string sub2 = RouteData.Values["sub2"] == null ? "" : RouteData.Values["sub2"] as string;

        int id = Convert.ToInt32(RouteData.Values["id"]);

        MPUser user = null;
        try
        {
            user = new MPUser(id);
        }
        catch (MiaopassException)
        {
            Response.StatusCode = 404;
            Response.End();
        }

        MPData.page_user = JSON.UserDetail(user, Session["user"] as MPUser);
        MPData.sub1 = sub1;
        MPData.sub2 = sub2;
    }
}