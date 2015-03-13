using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class pick : MPPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            string from = Tools.GetStringFromRequest(Request.QueryString["from"]);
            string source = Tools.GetStringFromRequest(Request.QueryString["source"]);
            string description = Tools.GetStringFromRequest(Request.QueryString["description"]);
            MPData.from = from;
            MPData.source = source;
            MPData.description = description;
        }
        catch (MiaopassException)
        {
            Response.StatusCode = 404;
            Response.End();
        }
    }
}