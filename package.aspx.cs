using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class package : MPPage
{
    MPPackage _package = null;
    protected void Page_Load(object sender, EventArgs e)
    {        
        //try
        //{
        //    int packageid = Tools.GetInt32FromRequest(RouteData.Values["id"] as string);
        //    _package = new MPPackage(packageid);
        //}
        //catch
        //{
        //    Response.StatusCode = 404;
        //    Response.End();
        //}

        //Ajax();
        //GetData();
    }

    void Ajax()
    {
        if (Request.QueryString["max"] != null)
        {
            try
            {
                int max = Tools.GetInt32FromRequest(Request.QueryString["max"]);
                Response.Write(JSON.Stringify(GetData(max)));
                Response.End();
            }
            catch { }
        }
    }

    List<object> GetData(int max = 0, int limit = 30)
    {
        MPUser user = Session["user"] as MPUser;
        if (max == 0)
            max = int.MaxValue;
        var res = DB.SExecuteReader("select id from image where id<? and packageid=? order by id desc limit ?", max,_package.ID, limit);
        List<object> dataList = new List<object>();
        foreach (var item in res)
        {
            try
            {
                dataList.Add(JSON.Image(new MPImage(Convert.ToInt32(item[0])), user));
            }
            catch { }
        }
        return dataList;
    }
}