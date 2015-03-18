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

    document.title = "最新图片_喵帕斯";

    var max = 0;

    var fall1 = MPWaterFall.New($(window), waterfall, 4, 236, 6, 6, 6, 6);
    fall1.onBottom=function()
    {
        fall1.BeginUpdate();
        $.getJSON("", { ajax: true, max: max }, function (data)
        {
            var n1 = data.length;
            if (n1 == 0)
            {
                fall1.Complete();
                fall1.EndUpdate();
                return;
            }
            var list1 = [];
            for (var i = 0; i < n1; i++)
            {
                list1.push(MPWidget.Image.New(data[i]));
            }
            fall1.Push(list1);

            max = data[n1 - 1].id;
            fall1.EndUpdate();
        });
    }

    var list = [];
    var n = MPData.images.length;
    for (var i = 0; i < n; i++)
    {
        list.push(MPWidget.Image.New(MPData.images[i]));
    }
    fall1.Push(list);

    max = MPData.images[n - 1].id;
})