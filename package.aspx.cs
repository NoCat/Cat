using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class package_aspx : MPPage
{

    protected void Page_Load(object sender, EventArgs e)
    {
        MPPackage package = null;
        try
        {
            int packageid = Tools.GetInt32FromRequest(RouteData.Values["id"] as string);
            package = new MPPackage(packageid);
        }
        catch
        {
            Response.StatusCode = 404;
            Response.End();
        }

        int limit = 10;
        int max = Convert.ToInt32(Request.QueryString["max"]);
        if (max == 0)
            max = Int32.MaxValue;

        var list = new List<object>();
        var res = DB.SExecuteReader("select id from image where id<? and packageid=? order by id desc limit ?", max, package.ID, limit);
        if (Request.QueryString["simple"] != null && Request.QueryString["ajax"] != null)
        {
            foreach (var item in res)
            {
                list.Add(JSON.Image(new MPImage(Convert.ToInt32(item[0]))));
            }
        }
        else
        {
            foreach (var item in res)
            {
                list.Add(JSON.ImageDetail(new MPImage(Convert.ToInt32(item[0])), Session["user"] as MPUser));
            }
        }

        if(Request.QueryString["ajax"]!=null)
        {
            Response.Write(JSON.Stringify(list));
            Response.End();
            return;
        }

        MPData.package = JSON.PackageDetail(package, Session["user"] as MPUser);
        MPData.images = list;
    }
}