/// <reference path="../main.js" />
/// <reference path="../Format/User.js" />
MPWidget.ImageView = {};
MPWidget.ImageView.New = function (imageDetail)
{
    var fuser = MPFormat.User.New(imageDetail);
    var strVar = "";
    strVar += "<div class=\"image-view\">";
    strVar += "    <div class=\"main\">";
    strVar += "        <div class=\"image-piece piece\">";
    strVar += "            <div class=\"tool-bar\">";
    strVar += "                <div class=\"resave btn\" data-id=\"{0}\">转存<\/div>".Format(imageDetail.id);
    strVar += "                <div class=\"edit btn\">编辑<\/div>";
    strVar += "                <div class=\"delete btn\">删除<\/div>";
    strVar += "            <\/div>";
    strVar += "            <div class=\"image\">";
    strVar += "                <img src=\"img/236.jpg\" />";
    strVar += "            <\/div>";
    strVar += "            <div class=\"tool-bar-bottom\">";
    strVar += "                <div class=\"clear\"><\/div>";
    strVar += "            <\/div>";
    strVar += "        <\/div>";
    strVar += "    <\/div>";
    strVar += "    <div class=\"side\">";
    strVar += "        <div class=\"package-piece piece\">";
    strVar += "            <div class=\"info\">";
    strVar += "                <img class=\"avt\" src=\"img/sq_36.jpg\" />";
    strVar += "                <a class=\"title\">图包名<\/a>";
    strVar += "                <a class=\"username\">用户名<\/a>";
    strVar += "            <\/div>";
    strVar += "            <div class=\"images\">";
    strVar += "                <div class=\"image-waterfall\">";
    strVar += "                    <a class=\"image selected\" href=\"#\">";
    strVar += "                        <img src=\"img/77.jpg\" />";
    strVar += "                        <div class=\"cover\"><\/div>";
    strVar += "                    <\/a>";
    strVar += "                    <a class=\"image\" href=\"#\" style=\"top:150px\">";
    strVar += "                        <img src=\"img/77.jpg\" />";
    strVar += "                        <div class=\"cover\"><\/div>";
    strVar += "                    <\/a>";
    strVar += "                <\/div>";
    strVar += "            <\/div>";
    strVar += "        <\/div>";
    strVar += "        <div class=\"ad-piece piece\">";
    strVar += "        <\/div>";
    strVar += "    <\/div>";
    strVar += "    <div class=\"bottom\"><\/div>";
    strVar += "<\/div>";
}