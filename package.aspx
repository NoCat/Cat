<%@ Page Language="C#" AutoEventWireup="true" CodeFile="package.aspx.cs" Inherits="package" MasterPageFile="~/MP_MasterPage/MasterPage.master" %>

<asp:Content ContentPlaceHolderID="content" runat="Server">
    <div class="wrapper">
        <div class="page-package-info">
            <div class="bar1">
                <h1 class="title">图包标题</h1>
                <div class="action-btns">
                    <div class="btn edit">编辑</div>
                    <div class="btn organize">批量管理</div>
                    <div class="btn follow">关注</div>
                    <div class="btn praise">赞</div>
                </div>
                <div class="clear"></div>
                <div class="description">图包的描述信息</div>
            </div>
            <div class="bar2">
                <div class="user">
                    <img />
                    <div class="user-name">用户名</div>
                </div>
                <div class="tabs">
                    <div class="tab count">0图片</div>
                    <div class="tab follower">0人关注</div>
                </div>
            </div>
        </div>
        <div class="waterfall">
            <div class="image">
                <a class="img">
                    <img src="img/236.jpg" />
                </a>
                <div class="description">
                    这是文字描述
                </div>
                <div class="info">
                    <a class="avt">
                        <img src="img/sq_36.jpg" />
                    </a>
                    <div class="text">
                        <div class="line">这个人<a>a标签</a></div>
                        <div class="line">某个图包</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
