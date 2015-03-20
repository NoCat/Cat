/// <reference path="../config.js" />
/// <reference path="../main.js" />
/// <reference path="../Format/User.js" />

MPWidget.User = {};
MPWidget.User.New=function(userDetail)
{
    var fuser = MPFormat.User.New(userDetail);
    var strVar = "";
    strVar += "<div class=\"widget-user\">";
    strVar += "    <a class=\"avt\" href=\"/user/{0}\">".Format(userDetail.id);
    strVar += "        <img src=\"{0}\" />".Format(fuser.BigAvt());
    strVar += "    <\/a>";
    strVar += "    <a class=\"name\">{0}<\/a>".Format(fuser.Name());
    strVar += "    <div class=\"counts\">";
    strVar += "        <a class=\"item\" href=\"{1}\">{0}图片<\/a>".Format(userDetail.images_count,"/user/"+userDetail.id+"/image");
    strVar += "        <a class=\"item\" href=\"{1}\">{0}图包<\/a>".Format(userDetail.packages_count, "/user/" + userDetail.id);
    strVar += "    <\/div>";
    strVar += "    <div class=\"actions {0}\" data-id=\"{1}\"><\/div>".Format(userDetail.followed ? "follow" : "unfollow", userDetail.id);
    strVar += "<\/div>";

    var content = $(strVar);
    return content;
}

MPWidget.User.Bind = function () {
    $(document).on("click", ".widget-user .follow", follow_click)
    //关注用户
    .on("hover", ".widget-user .unfollow", unfollow_hover)
    //鼠标悬停在取消关注按钮上
    .on("click", "widget-user .unfollow", unfollow_click);
    //点击取消关注;

    function follow_click() {
        var id = $(this).attr("data-id");
        //获取用户ID
        $.post(host + "/ajax/follow-user", { user_id: id }, function (data) {
            if (data.code == 0) {
                $(this).removeClass("follow");
                $(this).addClass("unfollow");
                $(this).text("已关注");
            };
        }, "json");
    }

    function unfollow_hover() {
        $(this).text("取消关注");
    }

    function unfollow_click() {
        var dialog = MPMessageBox.New(MPMessageBox.Icons.Warn, "确认要取消关注吗?");
        dialog.onOK(function () {
            var id = $(this).attr("data-id");
            $.post(host + "/ajax/unfollow-user", { user_id: id }, function (data) {
                if (data.code==0) {
                    $(this).removeClass("unfollow");
                    $(this).addClass("follow");
                    $(this).text("关注");
                }
            }, "json");
        })
    }
}