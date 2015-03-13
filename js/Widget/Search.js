/// <reference path="../main.js" />
/// <reference path="../jquery.js" />
MPWidget.Search = {};
MPWidget.Search.New = function ()
{
    var strVar = "";
    strVar += "<div class=\"widget-search\">";
    strVar += "    <input type=\"text\" class=\"keyword\" autocomplete=\"on\" placeholder=\"搜索\" />";
    strVar += "    <div class=\"go\"><\/div>";
    strVar += "<\/div>";

    var res = $(strVar);
    var input = res.find("input");
    var go = res.find(".go");

    go.click(go_click);

    function go_click()
    {
        var val = input.val();
        location.href = "/search/" + encodeURIComponent(val);
    }

    return res;
}