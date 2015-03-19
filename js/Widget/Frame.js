/// <reference path="../Dialog/MessageBox.js" />
/// <reference path="../Dialog/CreateImageDialog.js" />
/// <reference path="../Dialog/UploadDialog.js" />
/// <reference path="../jquery.js" />
/// <reference path="../Dialog/LoginDialog.js" />
/// <reference path="../Dialog/TitleDialog.js" />
/// <reference path="../Dialog/Dialog.js" />
/// <reference path="../jquery.js" />
/// <reference path="../main.js" />
/// <reference path="../Format/User.js" />
/// <reference path="../jquery.cookie.js" />

MPWidget.Frame = {};
MPWidget.Frame.New = function ()
{
    var strVar = "";
    strVar += "<div class=\"widget-frame\">";
    strVar += "    <div class=\"header\">";
    strVar += "        <div class=\"wrapper\">";
    strVar += "            <div class=\"menu-bar\">";
    strVar += "                <div class=\"left\">";
    strVar += "                    <div class=\"nav home-nav\">";
    strVar += "                        <a class=\"nav-link\" href=\"{0}\">主页<\/a>".Format(host);
    strVar += "                    <\/div>";
    strVar += "                    <div class=\"nav all-nav\">";
    strVar += "                        <a class=\"nav-link\" href=\"{0}\">最新<\/a>".Format(host + "/all");
    strVar += "                    <\/div>";
    strVar += "                    <div class=\"nav search\"><\/div>";
    strVar += "                <\/div>";
    strVar += "                <div class=\"right\">";
    if (MPData.user.id == 0)
    {
        strVar += "<div id=\"login\">登录</div>";
        strVar += "<div id=\"signup\">注册</div>";
    }
    else
    {
        strVar1 = "";
        strVar1 += "<div class=\"nav add-nav\">";
        strVar1 += "    <div class=\"nav-link\" title=\"添加\">";
        strVar1 += "    <\/div>";
        strVar1 += "    <div class=\"hide-menu\"><\/div>";
        strVar1 += "<\/div>";
        strVar1 += "<div class=\"nav user-nav\">";
        strVar1 += "    <a class=\"nav-link\" href=\"{0}\">";
        strVar1 += "        <img class=\"avt\" src=\"{1}\" />";
        strVar1 += "        <div class=\"arrow\"><\/div>";
        strVar1 += "    <\/a>";
        strVar1 += "    <div class=\"hide-menu\">";
        strVar1 += "        <a class=\"item\" href=\"{0}\">我的主页<\/a>";
        strVar1 += "        <div class=\"seperator\"><\/div>";
        strVar1 += "        <a class=\"item\" href=\"{2}\">我的关注<\/a>";
        strVar1 += "        <a class=\"item\" href=\"{3}\">我的粉丝<\/a>";
        strVar1 += "        <div class=\"seperator\"><\/div>";
        strVar1 += "        <a class=\"item\">设置<\/a>";
        strVar1 += "        <div class=\"item\" id=\"logout\">退出<\/div>";
        strVar1 += "    <\/div>";
        strVar1 += "<\/div>";

        var fuser = MPFormat.User.New(MPData.user);
        strVar += strVar1.Format(fuser.Home(), fuser.Avt(), fuser.Following(), fuser.Follower());
    }
    strVar += "                <\/div>";
    strVar += "            <\/div>";
    strVar += "        <\/div>";
    strVar += "    <\/div>";
    strVar += "    <div class=\"wrapper\">";
    strVar += "        <div class=\"body\"><\/div>";
    strVar += "    <\/div>";
    strVar += "<\/div>";
    var content = $(strVar);

    var search = content.find(".header .search");
    content.Body = content.find(".body");

    var s = MPWidget.Search.New();
    search.append(MPWidget.Search.New());

    if (MPData.user.id == 0)
    {
        var login = content.find("#login");
        var signup = content.find("#signup");

        login.click(function ()
        {
            var dialog = MPLoginDialog.New();
            dialog.onSuccess = function ()
            {
                location.reload();
            }
        });
        signup.click(function ()
        {
            MPSignUpDialog.New();
        })
    }
    else
    {
        var p = content.find(".user-nav");
        var m = p.find(".hide-menu");
        var l = content.find("#logout");//登出
        MPMenu(p, m);

        l.click(function () {
            if ($.cookie("login")==null) {
                MPMessageBox.New(MPMessageBox.Icons.Error, "请先登录");
                return;
            }
            $.post(host + "/ajax/logout", {}, function (data) {
                if (data.code==0) {
                    $.cookie("login", null);
                    location.reload();
                }
            }, "json");
        });

        var add = content.find(".add-nav");
        add.click(function ()
        {
            var dialog = MPUploadDialog.New();
            dialog.onSuccess = function ()
            {
                var c = MPCreateImageDialog.New(imageHost + "/" + dialog.hash + "_fw236", "上传图片", dialog.filename);
                c.onOK = function ()
                {
                    $.post(host + "/ajax/create-image", { package_id: c.packageId, file_hash: dialog.hash, description: MPHtmlEncode(c.description) }, function (msg)
                    {
                        if (msg.code == 0)
                        {
                            MPMessageBox.New(MPMessageBox.Icons.OK, "上传图片成功");
                            c.Close();
                        }
                        else
                        {
                            MPMessageBox.New(MPMessageBox.Icons.Error, msg.msg);
                        }
                    }, "json");
                }
            }
        });
    }
    return content;
};