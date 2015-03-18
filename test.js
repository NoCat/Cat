/// <reference path="js/jquery.js" />
$(function ()
{
    var body = $("body");
    for (var i = 0; i < 20; i++)
    {
        body.append($("<div></div>").text("这是第" + i + "个div"));
    }

    document.title = "js动态标题";
});