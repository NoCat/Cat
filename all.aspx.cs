using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;

public partial class all_aspx : MPPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Ajax();
        MPData.images = GetData();
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

    List<object> GetData(int max=0, int limit = 10)
    {
        MPUser user = Session["user"] as MPUser;
        if (max == 0)
            max = int.MaxValue;
        var res = DB.SExecuteReader("select id from image where id<? order by id desc limit ?", max, limit);
        List<object> dataList = new List<object>();
        foreach (var item in res)
        {
            try
            {
                dataList.Add(JSON.ImageDetail(new MPImage(Convert.ToInt32(item[0])), user));
            }
            catch { }
        }
        return dataList;
    }
}