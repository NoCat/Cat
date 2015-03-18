/// <reference path="Widget/package.js" />
/// <reference path="main.js" />
/// <reference path="Widget/user-info.js" />
/// <reference path="Widget/Image.js" />
/// <reference path="Widget/package.js" />
$(function ()
{
    var frame = MPWidget.Frame.New();
    var userInfo = MPWidget.UserInfo.New();
    frame.Body.append(userInfo);
    $("body").append(frame);

    switch(MPData.sub1)
    {
        case "image":
            {
                var max = userInfo.waterfall.Push(MPData.datas, MPWidget.Image,null,"id");
                userInfo.waterfall.onBottom=function()
                {
                    userInfo.waterfall.BeginUpdate();
                    $.getJSON("", { ajax: true, max: max }, function (data)
                    {
                        max = userInfo.waterfall.Push(data, MPWidget.Image, null, "id");
                        userInfo.waterfall.EndUpdate();
                    });
                }
            }
            break;
        default:
            userInfo.waterfall.Push(MPData.datas, MPWidget.Package);
            break;
    }
})