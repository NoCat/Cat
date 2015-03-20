<%@ Application Language="C#" %>
<%@ Import Namespace="System.Web.Routing" %>
<script RunAt="server">

    void RegisterRoutes(RouteCollection routes)
    {
        routes.MapPageRoute("home", "", "~/default.aspx", false);
        routes.MapPageRoute("all", "all", "~/all.aspx", false);
        routes.MapPageRoute("ajax", "ajax/{act}", "~/ajax.aspx", false); 
        routes.MapPageRoute("image", "image/{id}", "~/image.aspx", false);
        routes.MapPageRoute("package", "package/{id}", "~/package.aspx", false);
        routes.MapPageRoute("package_sub1", "package/{id}/{sub1}", "~/package.aspx", false);
        routes.MapPageRoute("user", "user/{id}", "~/user.aspx", false);
        routes.MapPageRoute("user_sub1", "user/{id}/{sub1}", "~/user.aspx", false);
        routes.MapPageRoute("user_sub2", "user/{id}/{sub1}/{sub2}", "~/user.aspx", false);
        routes.MapPageRoute("signup_email", "signup/email/{token}", "~/signup-email.aspx", false);
        routes.MapPageRoute("pick", "pick", "~/pick.aspx", false);
    }

    void Application_Start(object sender, EventArgs e)
    {
        // 在应用程序启动时运行的代码
        Downloader.Start();
        RegisterRoutes(RouteTable.Routes);
    }

    void Application_End(object sender, EventArgs e)
    {
        //  在应用程序关闭时运行的代码
    }

    void Application_Error(object sender, EventArgs e)
    {
        // 在出现未处理的错误时运行的代码

    }

    void Session_Start(object sender, EventArgs e)
    {
        string loginCookie = null;
        if (Request.Cookies["login"] != null)
            loginCookie = Request.Cookies["login"].Value;
        
        if (loginCookie != null)
        {
            var res = DB.SExecuteScalar("select userid from login_cookie where cookievalue=? and expire>?", loginCookie, DateTime.Now);
            if (res != null)
            {
                Session["user"] = new MPUser(Convert.ToInt32(res));
                return;
            }
        }

        Session["user"] = null;
    }

    void Session_End(object sender, EventArgs e)
    {
        // 在会话结束时运行的代码。 
        // 注意: 只有在 Web.config 文件中的 sessionstate 模式设置为
        // InProc 时，才会引发 Session_End 事件。如果会话模式设置为 StateServer
        // 或 SQLServer，则不引发该事件。

    }
       
</script>
