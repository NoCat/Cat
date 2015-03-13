MPLoginDialog = {};
MPLoginDialog.New = function ()
{
    var dialog = MPDialog.New('<div class="dialog-mask"><div class="dialog-box"><div class="dialog-title"><span class="text">登录</span><div class="dialog-close"></div></div><div class="dialog-content"><div class="login-dialog"><input class="email" type="text" placeholder="注册邮箱"> <input class="password" type="password" placeholder="密码"><div class="reset">忘记了密码？</div><div class="login">登录</div><div class="more"><span>还没有注册？</span> <span class="signup">立即注册</span></div></div></div></div></div>');
    dialog.onSuccess = null;

    var ButtonForget = dialog.Content.find(".reset").click(function ()//忘记密码
    {
        dialog.Close();
        MPResetPasswordDialog.New();
    })//忘记密码

    var ButtonLogin = dialog.Content.find(".login").click(function ()
    {
        var e = dialog.Content.find(".email").val();
        var p = dialog.Content.find(".password").val();
        if (MPCheckEmail(e) == false)
            return;
        if (MPCheckPassword(p) == false)
            return;
        $.post(host + "/ajax/login", { email: MPHtmlEncode(e), password: MPHtmlEncode(p) },
         function (data)
         {
             if (data.code == 0)
             {
                 $.cookie("login", data.cookie, { expires: 30 });
                 dialog.Close();
                 if (dialog.onSuccess != null)
                 {
                     dialog.onSuccess();
                 }
             }
             else
             {
                 MPMessageBox.New("error", data.msg);
             }
         }, "json");
    })//登录按钮

    var Buttonsignup = dialog.Content.find(".signup").click(function ()
    {
        dialog.Close();
        MPSignUpDialog.New();
    })//注册按钮
    return dialog;
}