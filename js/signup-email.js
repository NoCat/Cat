/// <reference path="Dialog/TitleDialog.js" />
/// <reference path="main.js" />
/// <reference path="Dialog/MessageBox.js" />

$(function ()
{
    var username = $("#username");
    var password = $("#password");
    var password2 = $("#password2");
    var submit = $("#submit");

    submit.click(submit_click);

    function submit_click()
    {
        if (username.val() == "" || password.val() == "" || password2.val() == "")
        {
            MPMessageBox.New(MPMessageBox.Icons.Warn, "请将信息填写完整");
            return;
        }

        if ($.trim(username.val()).length > 10)
        {
            MPMessageBox.New(MPMessageBox.Icons.Warn, "昵称过长,昵称字数不能超过十个");
            return;
        }

        if (password.val() != password2.val())
        {
            MPMessageBox.New(MPMessageBox.Icons.Warn, "两次输入的密码不一致,请检查后重新输入");
            return;
        }

        var currentUrl = location.href;
        $.post(currentUrl, { username: MPHtmlEncode(username.val()), password: MPHtmlEncode(password.val()) }, function myfunction(data)
        {
            if (data.code == 0)
            {
                var dialog = MPMessageBox.New(MPMessageBox.Icons.OK, "注册成功,点击确认后返回主页");
                dialog.onOK = function ()
                {
                    location.href = host;
                };
            }
            else
            {
                MPMessageBox.New(MPMessageBox.Icons.Error, data.msg);
            }
        }, "json")
        //检查用户名长度,不得大于10个字符

        //检查两次输入的密码

        //提交申请,申请提交后有可能用户名冲突之类的问题,弹窗处理
    }
})