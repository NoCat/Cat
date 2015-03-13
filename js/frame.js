/// <reference path="jquery.js" />
/// <reference path="main.js" />

$(document).ready(function () {
    var nav = $(".header .user-nav");
    var menu = nav.find(".hide-menu");

    MPMenu(nav, menu);
});