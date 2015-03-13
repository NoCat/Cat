/// <reference path="MessageBox.js" />
/// <reference path="Dialog.TitleDialog.js" />
MPCreatePackage = {
    New: function ()
    {
        var dialog = MPTitleDialog.New('<div class="dialog-mask"><div class="dialog-box"><div class="dialog-title"><span class="text">新建图包</span><div class="dialog-close"></div></div><div class="dialog-content"><div class="create-package-dialog"><input type="text" class="package-title" placeholder="请输入图包标题"></div></div><div class="dialog-btns"><div class="ok">确认</div></div></div></div>', "创建图包");
        var inputname = dialog.Content.find(".package-title");
        dialog.packageid = null;
        dialog.ButtonOK.click(function ()
        {
            $.post(host + "/ajax/create-package", { title: MPHtmlEncode(inputname.val()) }, function (data)
            {
                if (data.code == 0)
                {
                    dialog.packageid = data.id;
                    dialog.Close();
                }
                else
                {
                    MPMessageBox.New(MPMessageBox.Icons.Warn, data.msg);
                }
            }, "json");
        })
        return dialog;
    }
}