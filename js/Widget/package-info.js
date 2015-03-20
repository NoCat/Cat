/// <reference path="../main.js" />
/// <reference path="../Format/User.js" />
MPWidget.PackageInfo = {};
MPWidget.PackageInfo.New=function(packageDetail)
{
    var strVar = "";
    strVar += "<div class=\"widget-packageinfo\">";
    strVar += "<div class=\"inner\">";
    strVar += "    <div class=\"bar1\">";
    strVar += "        <h1 class=\"title\">{0}<\/h1>".Format(packageDetail.title);
    strVar += "        <div class=\"action-btns\">";
    strVar += "            <div class=\"btn edit\" data-id=\"{0}\">编辑<\/div>".Format(packageDetail.id);
    strVar += "            <div class=\"btn organize\" data-id=\"{0}\">批量管理<\/div>".Format(packageDetail.id);
    strVar += "            <div class=\"btn follow\" data-id=\"{0}\">关注<\/div>".Format(packageDetail.id);
    strVar += "            <div class=\"btn praise\" data-id=\"{0}\">赞<\/div>".Format(packageDetail.id);
    strVar += "        <\/div>";
    strVar += "        <div class=\"clear\"><\/div>";
    strVar += "        <div class=\"description\">{0}<\/div>".Format(packageDetail.description);
    strVar += "    <\/div>";

    var fuser = MPFormat.User.New(packageDetail.user);
    strVar += "    <div class=\"bar2\">";
    strVar += "        <div class=\"user\">";
    strVar += "             <a href=\"{0}\"><img src=\"{1}\" /></a>".Format(fuser.Home(),fuser.Avt());
    strVar += "            <a class=\"user-name\" href=\"{0}\">{1}<\/a>".Format(fuser.Home(),fuser.Name());
    strVar += "        <\/div>";
    strVar += "        <div class=\"tabs\">";
    strVar += "            <div class=\"tab count\">{0}图片<\/div>".Format(packageDetail.imageCount);
    strVar += "            <div class=\"tab follower\">{0}人关注<\/div>".Format(packageDetail.followerCount);
    strVar += "        <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "     <div class=\"waterfall\"></div>";
    strVar += "<\/div>";

    var content = $(strVar);
    content.waterfall = MPWaterFall.New($(window), content.find(".waterfall"), 4, 236, 6, 6, 6, 6);

    return content;
}