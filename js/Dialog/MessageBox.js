/// <reference path="Dialog.TitleDialog.js" />
MPMessageBox = {
    Icons: {
        Error: "error",
        OK: "ok",
        Warn: "warn"
    },
    New: function (icon, message)
    {
        var title;
        switch (icon)
        {
            case this.Icons.Warn:
                title = "警告";
                break;
            case this.Icons.Error:
                title = "错误";
                break;
            case this.Icons.OK:
                title = "成功";
                break;
            default:;
        }
        var box = MPTitleDialog.New('<div class="dialog-mask"><div class="dialog-box"><div class="dialog-title"><span class="text">对话框</span><div class="dialog-close"></div></div><div class="dialog-content"><div class="messagebox"><div class="icon"></div><div class="message">这里是一条信息</div></div></div><div class="dialog-btns"><div class="ok">确认</div></div></div></div>', title);
        box.onOK = null;
        var m = box.Content.find(".message");
        m.text(message);
        box.ButtonOK.click(function ()
        {
            box.Close();
            if(box.onOK!=null)
            {
                box.onOK();
            }
        })
        var bicon = box.Content.find(".icon");
        bicon.addClass(icon);
        return box;
    }
}