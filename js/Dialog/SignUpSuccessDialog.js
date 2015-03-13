/// <reference path="MessageBox.js" />
/// <reference path="../main.js" />
MPSignUpSuccessDialog = {};
MPSignUpSuccessDialog.New = function (email)
{
    var strVar = "";
    strVar += "<div class=\"dialog-mask\">";
    strVar += "    <div class=\"dialog-box\">";
    strVar += "        <div class=\"dialog-title\">";
    strVar += "            <span class=\"text\">注册成功<\/span>";
    strVar += "            <div class=\"dialog-close\"><\/div>";
    strVar += "        <\/div>";
    strVar += "        <div class=\"dialog-content\">";
    strVar += "            <div class=\"signup-success-dialog\">";
    strVar += "                <p>验证邮件已经发送到<span class=\"email\">{0}<\/span>，请查收邮件激活帐号完成注册。<\/p>";
    strVar += "                <p>如果没有收到邮件，请耐心等待，或者<span class=\"resend\">重新发送<\/span><\/p>";
    strVar += "                <p class=\"return\">&lt;&lt; 返回登录页<\/p>";
    strVar += "            <\/div>";
    strVar += "        <\/div>";
    strVar += "    <\/div>";
    strVar += "<\/div>";
    strVar += "";

    var dialog = MPDialog.New(strVar.Format(email));

    var buttonResend = dialog.Content.find(".resend");//重新发送
    var buttonReturn = dialog.Content.find(".return");//登录按钮

    buttonResend.click(function ()
    {
        $.post(host + "/ajax/signup-email", { email: MPHtmlEncode(email) }, function (data)
        {
            if (data.code == 0)
            {
                MPMessageBox.New(MPMessageBox.Icons.OK, "邮件发送成功,请查收");
            }
        }, "json");
    })
    buttonReturn.click(function ()
    {
        dialog.Close();
        MPLoginDialog.New();
    })
    return dialog;
}