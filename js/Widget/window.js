/// <reference path="../main.js" />
/// <reference path="image-view.js" />

MPWidget.Window = {};
MPWidget.Window.New=function(element)
{
    var content = null;
    if (element != undefined)
        content = $(element);
    else
    {
        var strVar = "";
        strVar += "<div class=\"widget-window\">";
        strVar += "     <div class=\"container\">";
        strVar += "         <div class=\"close\"><\/div>";
        strVar += "         <div class=\"prev\"><\/div>";
        strVar += "         <div class=\"next\"><\/div>";
        strVar += "         <div class=\"viewer\"><\/div>";
        strVar += "      </div>";
        strVar += "<\/div>";
        content = $(strVar);

        var next = content.find(".next");
        var prev = content.find(".prev");
        var close = content.find(".close");
        var viewer = content.find(".viewer");
        var current = null;

        next.click(next_click);
        prev.click(prev_click);
        close.click(close_click);
        content.on("click", ".image-waterfall .image", image_click);
    }

    function image_click(e)
    {
        //防止浏览器跳转
        e.preventDefault();
        var id = $(this).attr("data-id");
        Show(id);
    }

    function next_click()
    { 
        content.Init(current.next(".widget-image"));
    }

    function prev_click()
    {
        content.Init(current.prev(".widget-image"));
    }

    function close_click()
    {
        content.remove();
        if(content.onClose!=null)
        {
            content.onClose();
        }
    }

    function Show(id)
    {
        $.getJSON("/image/" + id + "?ajax=", function (data)
        {
            viewer.empty();
            var imageView = MPWidget.ImageView.New(data);
            viewer.append(imageView);
            imageView.Run();
        })
    }

    content.Init=function(widget_image)
    {
        current = widget_image;

        if (widget_image.next(".widget-image").length == 0)
            next.hide();
        else
            next.show();

        if (widget_image.prev(".widget-image").length == 0)
            prev.hide();
        else
            prev.show();
        
        var id = widget_image.attr("data-id");

        Show(id);
    }

    content.onClose = null;

    return content;
}