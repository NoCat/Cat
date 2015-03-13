<%@ Page Language="C#" AutoEventWireup="true" CodeFile="signup-email.aspx.cs" Inherits="signup_email" MasterPageFile="~/MP_MasterPage/MasterPage_NoUI .master" %>

<asp:Content runat="server" ContentPlaceHolderID="head">
    <link href="<%=ResolveUrl("~/css/signup-email.css") %>" rel="stylesheet" />
    <script src="<%=ResolveUrl("~/js/signup-email.js") %>"></script>
</asp:Content>
<asp:Content runat="server" ContentPlaceHolderID="body">
    <div class="form">
        <div class="title">请完善注册信息</div>
        <input type="text" value="<%=Email %>" readonly="readonly">
        <div class="i">昵称:</div>
        <input maxlength="20" id="username" name="username" type="text" />
        <div class="i">密码:</div>
        <input type="password" id="password" name="password" />
        <div class="i">确认密码:</div>
        <input type="password" id="password2" />
        <div id="submit">提交</div>
    </div>
</asp:Content>
