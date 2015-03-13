<%@ Page Language="C#" AutoEventWireup="true" CodeFile="setting.aspx.cs" Inherits="setting" MasterPageFile="~/MP_MasterPage/MasterPage.master" %>


<asp:Content ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" type="text/css" href="<%=ResolveUrl("~/css/setting.css") %>" />
</asp:Content>
<asp:Content ContentPlaceHolderID="content" runat="server">
    <div class="setting">
        <h1>设置</h1>
        <div class="parts">
            <div class="part">
                <div class="title">
                    <span>个人资料</span>
                </div>
                <div class="detail">
                    <table>
                        <tr>
                            <td class="title">登录邮箱:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="title">昵称:</td>
                            <td>
                                <input type="text" id="input_username" /></td>
                        </tr>
                        <tr>
                            <td class="title">个性签名:</td>
                            <td>
                                <textarea id="input_signature"></textarea></td>
                        </tr>
                        <tr>
                            <td class="title"></td>
                            <td>
                                <div class="save">保存</div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="part">
                <div class="title">
                    <span>头像</span>
                </div>
                <div class="detail">
                    <table>
                        <tr>
                            <td class="userhead">
                                <img id="headimg" src="" /></td>
                            <td class="btns">
                                <div class="upload">上传头像</div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="part">
                <div class="title">
                    <span>密码</span>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
