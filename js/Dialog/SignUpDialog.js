MPSignUpDialog = {};
MPSignUpDialog.New = function ()
{
    var dialog = MPDialog.New('<div class="dialog-mask"><div class="dialog-box"><div class="dialog-title"><span class="text">注册</span><div class="dialog-close"></div></div><div class="dialog-content"><div class="signup-dialog"><input class="email" type="text" placeholder="邮箱"><div class="signup">注册</div><div class="more"><span>已经有账号了</span> <span class="login">登录</span></div></div></div></div></div>')
    var buttonsignup = dialog.Content.find(".signup");//注册按钮
    var buttonlogin = dialog.Content.find(".login");//登录按钮
    buttonsignup.click(function ()
    {
        var e = dialog.Content.find(".email").val();//注册邮箱
        if (MPCheckEmail(e) == false)
            return false;
        $.post(host + "/ajax/signup-email", { email: MPHtmlEncode(e) }, function (data)
        {
            if (data.code == 0)
            {
                dialog.Close();
                MPSignUpSuccessDialog.New(e);
            }
            else
            {
                MPMessageBox.New("warn", "注册邮件发送失败,请重试");
            }

        }, "json");
    })
    buttonlogin.click(function ()
    {
        dialog.Close();
        MPLoginDialog.New();
    })
    return dialog;
}