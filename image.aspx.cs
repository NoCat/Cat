using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class image : MPPage
{
    MPImage _image = null;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            int imageid = Tools.GetInt32FromRequest(RouteData.Values["id"] as string);
            _image = new MPImage(imageid);
        }
        catch
        {
            Response.StatusCode = 404;
            Response.End();
        }

        Ajax();

        MPData.image = JSON.ImageDetail(_image, Session["user"] as MPUser);
    }

    void Ajax()
    {
        if (Request.QueryString["ajax"] == null)
            return;

        Response.Write(JSON.Stringify(JSON.ImageDetail(_image, Session["user"] as MPUser)));

        Response.End();
    }
}