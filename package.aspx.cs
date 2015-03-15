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
        try
        {
            int packageid = Tools.GetInt32FromRequest(RouteData.Values["id"] as string);
            _package = new MPPackage(packageid);
        }
        catch
        {
            Response.StatusCode = 404;
            Response.End();
        }

        Ajax();
        GetData();
    }

    void Ajax()
    {
        if (Request.QueryString["ajax"]==null)
            return;

        int max = Convert.ToInt32(Request.QueryString["max"]);
        Response.Write(JSON.Stringify(GetData(max)));
        Response.End();
    }

    List<object> GetData(int max = 0, int limit = 30)
    {
        bool isSimple = false;
        if (max == 0)
            max = int.MaxValue;
        if (Request.QueryString["simple"] != null)
            isSimple = true;
        var res = DB.SExecuteReader("select id from image where id<? and packageid=? order by id desc limit ?", max, _package.ID, limit);
        List<object> dataList = new List<object>();

        if (isSimple == true)
        {
            try
            {
                foreach (var item in res)
                {
                    dataList.Add(JSON.Image(new MPImage(Convert.ToInt32(item[0]))));
                }
            }
            catch { }
        }
        else
        {
            MPUser user = Session["user"] as MPUser;
            foreach (var item in res)
            {
                try
                {
                    dataList.Add(JSON.ImageDetail(new MPImage(Convert.ToInt32(item[0])), user));
                }
                catch { }
            }
        }
        return dataList;
    }
}