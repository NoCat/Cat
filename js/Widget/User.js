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
    strVar += "    <div class=\"actions {0}\" data-id=\"{1}\"><\/div>".Format(userDetail.followed?"follow":"unfollow",userDetail.id);
    strVar += "<\/div>";

    var content = $(strVar);
    return content;
}