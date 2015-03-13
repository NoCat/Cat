/// <reference path="../Format/User.js" />
/// <reference path="../main.js" />

MPWidget.Package = {};
MPWidget.Package.Types = {
    SmallButton: 0,
    BigButton: 1
};
MPWidget.Package.New = function (packageDetail, type)
{
    var strVar = "";
    strVar += "<div class=\"widget-package\">";
    strVar += "    <a class=\"previews\" href=\"{0}\">".Format(host+"/package/"+packageDetail.id);
    if (packageDetail.thumbs.length != 0)
    {
        strVar += "        <div class=\"thumbs\">";

        var n = packageDetail.thumbs.length;
        for (var i = 0; i < n; i++)
        {
            if (i == 0)
            {
                strVar += " <img class=\"cover\" src=\"{0}\" />".Format(imageHost + "/" + packageDetail.thumbs[0].file.hash + "_sq216");
            }
            else
            {
                strVar += " <img class=\"thumb\" src=\"{0}\" />".Format(imageHost + "/" + packageDetail.thumbs[i].file.hash + "_sq70");
            }
        }
        strVar += "        <\/div>";
    }
    strVar += "        <div class=\"borders\">";
    strVar += "            <div class=\"cover-border\"><\/div>";
    strVar += "            <div class=\"thumb-border\"><\/div>";
    strVar += "            <div class=\"thumb-border\"><\/div>";
    strVar += "            <div class=\"thumb-border\"><\/div>";
    strVar += "        <\/div>";
    strVar += "        <div class=\"over empty-package\">";
    strVar += "            <h3>{0}<\/h3>".Format(packageDetail.title);
    strVar += "            <h4>{0}<\/h4>".Format(packageDetail.description);
    strVar += "        <\/div>";
    strVar += "    <\/a>";

    var fuser = MPFormat.User.New(packageDetail.user);
    strVar += "    <div class=\"follow\">";
    if (packageDetail.user.id == MPData.user.id)
    {
        strVar += "<div class=\"btn2 edit\" data-id=\"{0}\">编辑<\/div>".Format(fuser.ID());
    }
    else
    {
        switch (type)
        {
            case this.Types.SmallButton:
                strVar += "        <a class=\"avt\" href=\"{0}\">".Format(fuser.Home());
                strVar += "            <img src=\"{0}\" />".Format(fuser.Avt());
                strVar += "        <\/a>";
                strVar += "        <a class=\"username\" href=\"{0}\" >{1}<\/a>".Format(fuser.Home(), fuser.Name);
                if (packageDetail.user.followed == true)
                {
                    strVar += "        <div class=\"btn unfollow\" data-id=\"{0}\">已关注<\/div>".Format(fuser.ID());
                }
                else
                {
                    strVar += "        <div class=\"btn follow\" data-id=\"{0}\">关注<\/div>".Format(fuser.ID());
                }
                break;
            case this.Types.BigButton:
                if (packageDetail.user.followed == true)
                {
                    strVar += "        <div class=\"btn2 unfollow\" data-id=\"{0}\">已关注<\/div>".Format(fuser.ID());
                }
                else
                {
                    strVar += "        <div class=\"btn2 follow\" data-id=\"{0}\">关注<\/div>".Format(fuser.ID());
                }
                break;
        }
    }
    strVar += "<\/div>";

    var res = $(strVar);
    return res;
}

MPWidget.Package.Bind=function(parent)
{
    //编辑点击(图包是自己时)
    parent.on("click", ".edit", edit_click)
        //点击关注
    .on("click", ".follow", follow_click)
        //点击取消关注
    .on("click", ".unfollow", unfollow_click);

    function edit_click()
    {
        //提取id
        var id = $(this).attr("data-id");
        //do something
    }

    function follow_click()
    {
        //do something
    }

    function unfollow_click()
    {
        //do something
    }
}