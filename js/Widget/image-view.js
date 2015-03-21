/// <reference path="../main.js" />
/// <reference path="../Format/User.js" />
MPWidget.ImageView = {};
MPWidget.ImageView.New = function (imageDetail)
{
    var fuser = MPFormat.User.New(imageDetail.user);
    var strVar = "";
    strVar += "<div class=\"image-view\">";
    strVar += "    <div class=\"main\">";
    strVar += "        <div class=\"image-piece piece\">";
    strVar += "            <div class=\"tool-bar\">";
    strVar += "                <div class=\"resave btn\" data-id=\"{0}\">转存<\/div>".Format(imageDetail.id);
    strVar += "                <div class=\"edit btn\" data-id=\"{0}\">编辑<\/div>".Format(imageDetail.id);
    strVar += "                <div class=\"delete btn\" data-id=\"{0}\">删除<\/div>".Format(imageDetail.id);
    strVar += "            <\/div>";
    strVar += "            <div class=\"image\">";
    strVar += "                <img src=\"{0}\" />".Format(imageHost + "/" + imageDetail.file.hash + "_fw658");
    strVar += "            <\/div>";
    strVar += "            <div class=\"tool-bar-bottom\">";
    strVar += "                <div class=\"clear\"><\/div>";
    strVar += "            <\/div>";
    strVar += "        <\/div>";
    strVar += "    <\/div>";
    strVar += "    <div class=\"side\">";
    strVar += "        <div class=\"package-piece piece\">";
    strVar += "            <div class=\"info\">";
    strVar += "                <img class=\"avt\" src=\"{0}\" />".Format(fuser.Avt());
    strVar += "                <a class=\"title\" href=\"{1}\">{0}<\/a>".Format(imageDetail.package.title, "/package/" + imageDetail.package.id);
    strVar += "                <a class=\"username\" href=\"{1}\">{0}<\/a>".Format(fuser.Name(), "/user/" + fuser.ID());
    strVar += "            <\/div>";
    strVar += "            <div class=\"images\">";
    strVar += "                <div class=\"image-waterfall\">";
    strVar += "                <\/div>";
    strVar += "            <\/div>";
    strVar += "        <\/div>";
    strVar += "        <div class=\"ad-piece piece\">";
    strVar += "             <script charset=\"gbk\" src=\"http://p.tanx.com/ex?i=mm_26054915_7856098_29204897 \"></script>";
    strVar += "        <\/div>";
    strVar += "    <\/div>";
    strVar += "    <div class=\"bottom\"><\/div>";
    strVar += "<\/div>";

    var res = $(strVar);
    res.Run = function ()
    {
        var wf = MPWaterFall.New(res.find(".images"), res.find(".image-waterfall"), 3, 76, 1, 1, 1, 1,false);
        var max = 0;
        wf.onBottom = function ()
        {
            wf.BeginUpdate();
            $.getJSON("/package/" + imageDetail.package.id, { ajax: true, simple: true, max: max }, function (data)
            {
                max = wf.Push(data, ImageItem, null, "id");
                wf.EndUpdate();
            })
        };
        wf.onBottom();
    }

    var ImageItem = {};
    ImageItem.New = function (image)
    {
        var strVar1 = "";
        strVar1 += "<a class=\"image\" href=\"{0}\" data-id=\"{1}\">".Format("/image/" + image.id, image.id);
        strVar1 += "     <img src=\"{0}\" width=\"76\" height=\"{1}\"/>".Format(imageHost + "/" + image.file.hash + "_fw78", Math.ceil(76 * image.file.height / image.file.width));
        strVar1 += "     <div class=\"cover\"><\/div>";
        strVar1 += "<\/a>";

        return $(strVar1);
    }

    return res;
}