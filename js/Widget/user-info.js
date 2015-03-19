/// <reference path="../main.js" />
/// <reference path="../Format/User.js" />
MPWidget.UserInfo = {};
MPWidget.UserInfo.New = function ()
{
    var userDetail = MPData.page_user;
    var fuser = MPFormat.User.New(userDetail);

    var strVar = "";
    strVar += "<div class=\"widget-userinfo\">";
    strVar += "        <div class=\"inner\">";
    strVar += "            <div class=\"info\">";
    strVar += "                <img class=\"avt\" src=\"{0}\" />".Format(fuser.BigAvt());
    strVar += "                <div class=\"right\">";
    strVar += "                    <div class=\"username\">{0}<\/div>".Format(fuser.Name());
    strVar += "                    <div class=\"counts\">";
    strVar += "                        <a class=\"item\" href=\"{1}\">{0}关注<\/a>".Format(userDetail.follows_count,"/user/"+fuser.ID()+"/following");
    strVar += "                        <a class=\"item\" href=\"{1}\">{0}粉丝<\/a>".Format(userDetail.followers_count, "/user/" + fuser.ID() + "/follower");
    strVar += "                    <\/div>";
    strVar += "                <\/div>";
    strVar += "                <div class=\"clear\"><\/div>";
    strVar += "            <\/div>";
    strVar += "            <div class=\"tabs\">";
    strVar += "                <a class=\"tab{1}\" href=\"{2}\">{0}图包<\/a>".Format(userDetail.packages_count, MPData.sub1 == "" ? " on" : "","/user/"+fuser.ID());
    strVar += "                <a class=\"tab{1}\" href=\"{2}\">{0}图片<\/a>".Format(userDetail.images_count, MPData.sub1 == "image" ? " on" : "", "/user/" + fuser.ID()+"/image");
    strVar += "                <a class=\"tab{1}\" href=\"{2}\">{0}赞<\/a>".Format(userDetail.praise_count, MPData.sub1 == "praise" ? " on" : "", "/user/" + fuser.ID() + "/praise");
    strVar += "            <\/div>";
    strVar += "        <\/div>";
    if (MPData.sub1 == "following")
    {
        strVar += "        <div class=\"outer\">";
        strVar += "            <div class=\"list\">";
        strVar += "                <a class=\"item{1}\" href=\"{0}\">用户<\/a>".Format("/user/" + userDetail.id + "/following/", MPData.sub2 == "" ? " on" : "");
        strVar += "                <a class=\"item{1}\" href=\"{0}\">图包<\/a>".Format("/user/" + userDetail.id + "/following/package", MPData.sub2 == "package" ? " on" : "");
        strVar += "            <\/div>";
        strVar += "        <\/div>        ";
    }
    else if (MPData.sub1 == "praise")
    {
        strVar += "        <div class=\"outer\">";
        strVar += "            <div class=\"list\">";
        strVar += "                <a class=\"item{1}\" href=\"{0}\">图片<\/a>".Format("/user/" + userDetail.id + "/praise/", MPData.sub2 == "" ? " on" : "");
        strVar += "                <a class=\"item{1}\" href=\"{0}\">图包<\/a>".Format("/user/" + userDetail.id + "/praise/package", MPData.sub2 == "package" ? " on" : "");
        strVar += "            <\/div>";
        strVar += "        <\/div>        ";
    }
    strVar += "<div class=\"waterfall\"></div>"
    strVar += "    <\/div>";
 

    var content = $(strVar);
    content.waterfall = MPWaterFall.New($(window), content.find(".waterfall"), 4, 236, 6, 6, 6, 6);

    return content;
    
}