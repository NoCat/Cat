/// <reference path="Render.js" />
MPRender.Head = {
    New: function ()
    {
        var strVar = "";
        strVar += "            <div class=\"menu-bar\">";
        strVar += "                <div class=\"left\">";
        strVar += "                    <div class=\"nav home-nav\">";
        strVar += "                        <div class=\"nav-link\">主页<\/div>";
        strVar += "                    <\/div>";
        strVar += "                    <div class=\"nav menu-nav\">";
        strVar += "                        <div class=\"nav-link\">";
        strVar += "                            <div class=\"arrow\"><\/div>";
        strVar += "                        <\/div>";
        strVar += "                        <div class=\"hide-menu\">";
        strVar += "                        <\/div>";
        strVar += "                    <\/div>";
        strVar += "                    <form id=\"search-form\" action=\"search\">";
        strVar += "                        <input type=\"text\" id=\"keyword\" autocomplete=\"on\" placeholder=\"搜索\" />";
        strVar += "                        <div class=\"go\"><\/div>";
        strVar += "                    <\/form>";
        strVar += "                <\/div>";
        strVar += "                <div class=\"right\">";
        strVar += "                     {0}";
        strVar += "                <\/div>";
        strVar += "            <\/div>";

        var res = MPRenderElement.New(strVar);
        res.right;
        if (MPData.user.id == 0)
            res.right = MPRender.Head.Right.NotLogin.New();
        else
            res.right = MPRender.Head.Right.LoggedIn.New(MPData.user);

        res.Children[0] = res.right;
        return res;
    },
    Right: {
        NotLogin: {
            New: function ()
            {
                var strVar = "";
                strVar += "<div id=\"login\">登录<\/div>";
                strVar += "<div id=\"signup\">注册<\/div>";

                var res = MPRenderElement.New(strVar);
                return res;
            }
        },
        LoggedIn: {
            New: function (user)
            {
                var strVar = "";
                strVar += "<div class=\"nav add-nav\">";
                strVar += "    <div class=\"nav-link\" title=\"添加\"><\/div>";
                strVar += "    <div class=\"hide-menu\"><\/div>";
                strVar += "<\/div>";
                strVar += "<div class=\"nav user-nav\">";
                strVar += "    <a class=\"nav-link\" href=\"{0}\">";
                strVar += "        <img class=\"avt\" src=\"{1}\" />";
                strVar += "        <div class=\"arrow\"><\/div>";
                strVar += "    <\/a>";
                strVar += "    <div class=\"hide-menu\">";
                strVar += "        <a class=\"item\" href=\"{0}\">我的主页<\/a>";
                strVar += "        <div class=\"seperator\"><\/div>";
                strVar += "        <a class=\"item\" href=\"{2}\">我的关注<\/a>";
                strVar += "        <a class=\"item\" href=\"{3}\">我的粉丝<\/a>";
                strVar += "        <div class=\"seperator\"><\/div>";
                strVar += "        <a class=\"item\">设置<\/a>";
                strVar += "        <div class=\"item\" id=\"logout\">退出<\/div>";
                strVar += "    <\/div>";
                strVar += "<\/div>";

                var res = MPRenderElement.New(strVar);
                var user1 = MPRender.User.New(user);
                res.userHome = user1.Home;
                res.userAvtImage = user1.Avt;
                res.userFollowing = "/user/{0}/following".Format(user.id);
                res.userFollower = "/user/{0}/follower".Format(user.id);

                res.Children[0] = res.userHome;
                res.Children[1] = res.userAvtImage;
                res.Children[2] = res.userFollowing;
                res.Children[3] = res.userFollower;

                return res;
            }
        }
    }
}