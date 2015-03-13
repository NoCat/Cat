using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using System.IO;


public class Mail
{
    const string _smtpServer = "smtp.exmail.qq.com"; //QQ邮件服务器
    const string _from = "system@miaopass.net";
    const string _fromPass = "Horse520";

    //static public void SendResetPasswordEmail(string emailAddress, string resetUrl)
    //{
    //    string strSubject = "【喵帕斯】密码修改";
    //    string content = File.ReadAllText(HttpContext.Current.Server.MapPath("~/doc/resetpwd.txt"));
    //    string strBody = string.Format(content, resetUrl);
    //    SendEmail(emailAddress, strSubject, strBody);
    //}

    static public void SendConfirmSignupEmail(string emailAddress, string token)
    {
        string strSubject = "确认注册";
        string content = File.ReadAllText(HttpContext.Current.Server.MapPath("~/MP_Doc/confirmSignup.txt"));
        content = string.Format(content, emailAddress, Tools.Host, token);
        string strBody = content;
        SendEmail(emailAddress, strSubject, strBody);
    }

    static public void SendResetPasswordEmail(string emailAddress,string token)
    {
        string subject = "重置密码";
        string content = File.ReadAllText(HttpContext.Current.Server.MapPath("~/MP_Doc/resetPassword.txt"));
        content = string.Format(content, emailAddress, Tools.Host, token);
        SendEmail(emailAddress, subject, content);
    }
    public static bool SendEmail(string strto, string strSubject, string strBody)
    {
        SmtpClient client = new SmtpClient(_smtpServer);
        client.Credentials = new System.Net.NetworkCredential(_from, _fromPass);
        client.DeliveryMethod = SmtpDeliveryMethod.Network;
        MailMessage message = new MailMessage(_from, strto, strSubject, strBody);
        message.IsBodyHtml = true;
        try
        {
            client.Send(message);
            return true;
        }
        catch
        {
            return false;
        }
    }

}