/// <reference path="Dialog.js" />
MPResetPasswordDialog = {
    New: function ()
    {
        var dialog = MPDialog.New('<div class="login_frame"><div class="dialog_close"></div><div>请输入注册邮箱 <input type="text" class="SignUpEmail"></div><div class="dialog_ok">发送邮件</div></div>');
        var inputemail = dialog.Content.find(".SignUpEmail");
        dialog.ButtonOK.click(function ()
        {
            if (MPCheckEmail(inputemail.val()) == false)
                return;
            $.post(host + "/ajax/reset-password", { email: MPHtmlEncode(inputemail.val()) }, function (data)
            {
                if (data.code == 0)
                {
                    dialog.Close();
                    MPMessageBox.New("warn", "重置密码邮件已发送到您的邮箱,请注意查收");
                }
            }, "json")
        })
        return dialog;
    }
}