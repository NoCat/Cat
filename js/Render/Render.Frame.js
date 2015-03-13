/// <reference path="Render.Body.js" />
/// <reference path="Render.Head.js" />
/// <reference path="RenderElement.js" />
/// <reference path="Render.js" />
MPRender.Frame = {
	New: function ()
	{
		var strVar = "";
		strVar += "<div class=\"header\">";
		strVar += "<div class=\"wrapper\">{0}</div>"
		strVar += "<\/div>";
		strVar += "<div class=\"body\">";
        strVar+="<div class=\"wrapper\">{1}</div>"
		strVar += "<\/div>";

		var res = MPRenderElement.New(strVar);

		res.Body = "";
		res.Head = MPRender.Head.New();

		res.Children.push(res.Head);
		res.Children.push(res.Body);

		return res;
	}
}