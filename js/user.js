/// <reference path="Widget/package.js" />
/// <reference path="main.js" />
/// <reference path="Widget/user-info.js" />
/// <reference path="Widget/Image.js" />
/// <reference path="Widget/package.js" />
$(function () {
    var frame = MPWidget.Frame.New();
    var userInfo = MPWidget.UserInfo.New();
    frame.Body.append(userInfo);
    $("body").append(frame);

    switch (MPData.sub1) {
        case "image":
            waterfallPush(userInfo, MPWidget.Image);
            break;

        case "praise":
            {
                switch (MPData.sub2) {
                    case "package":
                        waterfallPush(userInfo, MPWidget.Package);
                        break;
                    default:
                        waterfallPush(userInfo, MPWidget.Image);
                        break;
                }
            }
            break;

        case "following":
            {
                switch (MPData.sub2) {
                    case "package":
                        waterfallPush(userInfo, MPWidget.Package);
                        break;
                    default:
                        waterfallPush(userInfo, MPWidget.User);
                        break;
                }
            }
            break;

        case "follower":
            waterfallPush(userInfo, MPWidget.User);
            break;

        default:
            waterfallPush(userInfo, MPWidget.Package);
            break;
    }

    function waterfallPush(userinfo, instance) {
        var max = userinfo.waterfall.Push(MPData.datas, instance, null, "id");
        userinfo.waterfall.onBottom = function () {
            userinfo.waterfall.BeginUpdate();
            $.getJSON("", { ajax: true, max: max }, function (data) {
                max = userinfo.waterfall.Push(data, instance, null, "id");
                userinfo.waterfall.EndUpdate();
            });
        }
    }
})