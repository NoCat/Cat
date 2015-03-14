$(function () {
    //在这里开始写就可以了,chrome插件其实也就是一个js程序

    //服务器地址
    var host = "http://localhost:6777/";
    //准备收集的图片的url
    var source = "";
    //当前页面的url
    var from = location.href;
    //初始化的description,默认为当前页面的标题
    var description = document.title;


    //strVar为button的html+css设置,反正就是button的外观啦
    var strVar = '<div style="border:1px solid #000;border-radius:3px;text-align:center;height:50px;width:100px;background-color:white;position:absolute;" class="uri-ii"><div>收集</div></div>';
    //使用strVar来初始化button
    var button = $(strVar);
    button.click(button_click);
    $("body").append(button);

    //鼠标进入后显示按钮,按钮位置设置到图片左上?
    $(document).on("mouseenter", "img", img_mouseenter)
        //鼠标离开后按钮隐藏
    .on("mouseleave", "img", img_mouseleave);

    function img_mouseenter() {
        var t = $(this);
        if (t.height() >= 250 && t.width() >= 250) {
            button.show();
            source = t.attr("src");
            button.offset({ top: t.offset().top, left: t.offset().left });
            from = location.href;
        }
        //设置好source 和from的值
    }

    function img_mouseleave() {

        var t = $(this);
        var point = {};
        point.X = event.clientX;
        point.Y = event.clientY;
        if (!MPCheckInEle(t, point)) {
                button.fadeOut()
        }
        //按钮消失
    }

    function button_click() {
        //鼠标点击
        var url = host + "pick?from=" + encodeURIComponent(from) + "&source=" + encodeURIComponent(source) + "&description=" + encodeURIComponent(description);
        window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, copyhistory=yes, width=400, height=400");
    }

    function MPCheckInEle(node, point) {
        var mouseX = point.X;
        var mouseY = point.Y;
        var left = node.offset().left;
        var top = node.offset().top;
        var width = node.width();
        var height = node.height();
        if (mouseX > left && mouseX < left + width && mouseY > top && mouseY < top + height) {
            return true;
        }
        else {
            return false;
        }
    }
    function MPMenu(parent, menu, staytime, delaytime)//parent为点击目标 menu自行定义 staytime为鼠标离开menu后滞留时间 delaytime为点击后延时处理时间
    {
        var _stayTime = staytime ? staytime : 2000;
        var _delayTime = delaytime ? delaytime : 0;
        var _timerIdDisplay;
        var _timerIdHide;
        var _parent = $(parent);
        var _menu = $(menu);
        _parent.mouseenter(function () {
            clearTimeout(_timerIdHide);
            _timerIdDisplay = setTimeout(function () {
                _menu.show();
            }, _delayTime);
        })
        _parent.mouseleave(function () {
            clearTimeout(_timerIdDisplay);
            _timerIdHide = setTimeout(function () {
                _menu.hide();
            }, _stayTime);
        })

        _menu.mouseenter(function () {
            clearTimeout(_timerIdHide);
        })

        _menu.mouseleave(function () {
            _timerIdHide = setTimeout(function () {
                _menu.hide();
            }, _stayTime);
        })
    }
})