/// <reference path="jquery.js" />
/// <reference path="Widget/Frame.js" />
/// <reference path="main.js" />
/// <reference path="Widget/image-view.js" />
$(function ()
{
    var frame = MPWidget.Frame.New();
    var imageView = MPWidget.ImageView.New(MPData.image);
    frame.Body.append(imageView);

    $("body").append(frame);

    imageView.Run();
});