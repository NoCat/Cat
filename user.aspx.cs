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

        switch(sub1)
        {
            case "image":
                {
                    int max = 0;
                    try
                    {
                        max = Tools.GetInt32FromRequest(Request.QueryString["max"]);
                    }
                    catch { }

                    if(max==0)
                    {
                        max = Int32.MaxValue;
                    }

                    var res = DB.SExecuteReader("select id from image where userid=? and id<? order by id desc limit 10", user.ID,max);
                    var list = new List<object>();
                    foreach (var item in res)
                    {
                        list.Add(JSON.ImageDetail(new MPImage(Convert.ToInt32(item[0])), Session["user"] as MPUser));
                    }

                    if(Request.QueryString["ajax"]!=null)
                    {
                        Response.Write(JSON.Stringify(list));
                        Response.End();
                        return;
                    }
                    MPData.datas = list;
                }
                break;
            default:
                {
                    var res = DB.SExecuteReader("select id from package where userid=? limit 10", user.ID);
                    var list = new List<object>();
                    foreach (var item in res)
                    {
                        list.Add(JSON.PackageDetail(new MPPackage(Convert.ToInt32(item[0])), Session["user"] as MPUser));
                    }
                    MPData.datas = list;
                }
                break;
        }       
    }

}