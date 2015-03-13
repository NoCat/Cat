<%@ Page Language="C#" AutoEventWireup="true" CodeFile="test.aspx.cs" Inherits="test" MasterPageFile="~/MP_MasterPage/MasterPage_NoUI .master" %>

<asp:Content runat="server" ContentPlaceHolderID="head">
    <script>
        $(function ()
        {
            var frame = MPWidget.Frame.New();
            $("body").append(frame);
        })
    </script>
</asp:Content>