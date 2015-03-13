<%@ Page Language="C#" AutoEventWireup="true" CodeFile="user.aspx.cs" Inherits="user_aspx" MasterPageFile="~/MP_MasterPage/MasterPage_NoUI .master" %>
<asp:Content runat="server" ContentPlaceHolderID="head">
    <script type="text/javascript">
        $(function ()
        {
            var frame = MPWidget.Frame.New();
            frame.Body.append(MPWidget.UserInfo.New());
            $("body").append(frame);
        })
    </script>
</asp:Content>