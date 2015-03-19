/// <reference path="../main.js" />
/// <reference path="../Format/User.js" />
MPWidget.PackageInfo = {};
MPWidget.PackageInfo.New=function(packageDetail)
{
    var strVar = "";
    strVar += "<div class=\"widget-packageinfo\">";
    strVar += "    <div class=\"bar1\">";
    strVar += "        <h1 class=\"title\">图包标题<\/h1>";
    strVar += "        <div class=\"action-btns\">";
    strVar += "            <div class=\"btn edit\">编辑<\/div>";
    strVar += "            <div class=\"btn organize\">批量管理<\/div>";
    strVar += "            <div class=\"btn follow\">关注<\/div>";
    strVar += "            <div class=\"btn praise\">赞<\/div>";
    strVar += "        <\/div>";
    strVar += "        <div class=\"clear\"><\/div>";
    strVar += "        <div class=\"description\">图包的描述信息<\/div>";
    strVar += "    <\/div>";
    strVar += "    <div class=\"bar2\">";
    strVar += "        <div class=\"user\">";
    strVar += "            <img />";
    strVar += "            <div class=\"user-name\">用户名<\/div>";
    strVar += "        <\/div>";
    strVar += "        <div class=\"tabs\">";
    strVar += "            <div class=\"tab count\">0图片<\/div>";
    strVar += "            <div class=\"tab follower\">0人关注<\/div>";
    strVar += "        <\/div>";
    strVar += "    <\/div>";
    strVar += "<\/div>";
}