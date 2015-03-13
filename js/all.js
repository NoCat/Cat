/// <reference path="main.js" />
/// <reference path="Widget/Frame.js" />
/// <reference path="Widget/Image.js" />
$(function ()
{
    var frame = MPWidget.Frame.New();
    var waterfall = $("<div/>").addClass("waterfall");
    MPWidget.Image.Bind(waterfall);
    frame.Body.append(waterfall);
    $("body").append(frame);

    var fall1 = MPWaterFall.New($(window), waterfall, 4, 236, 6, 6, 6, 6);
    var list = [];
    var n = MPData.images.length;
    for (var i = 0; i < n; i++)
    {
        list.push(MPWidget.Image.New(MPData.images[i]));
    }
    fall1.Push(list);
})