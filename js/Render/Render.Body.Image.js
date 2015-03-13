/// <reference path="Render.Body.js" />
MPRender.Body.Image = {
    New: function (image)
    {
        var strVar = "";
        strVar += "<script>";
        strVar += "<div class=\"image\">";
        strVar += "    <div class=\"actions\">{0}<\/div>";
        strVar += "    <a class=\"img\" href=\"{4}\">";
        strVar += "        <img src=\"{1}\" width=\"236\" height=\"{2}\" />";
        strVar += "        <div class=\"cover\"><\/div>";
        strVar += "    <\/a>";
        strVar += "    <div class=\"description\">{3}<\/div>";
        strVar += "    <div class=\"info\">";
        strVar += "        <a class=\"avt\" href=\"{5}\">";
        strVar += "            <img src=\"{6}\" />";
        strVar += "        <\/a>";
        strVar += "        <div class=\"text\">";
        strVar += "            <div class=\"line\"><a href=\"{5}\">{7}<\/a><span>收集到<\/span><\/div>";
        strVar += "            <div class=\"line\"><a href=\"{8}\">{9}<\/a><\/div>";
        strVar += "        <\/div>";
        strVar += "    <\/div>";
        strVar += "<\/div>";
        strVar += "<\/script>";

        var res = MPRenderElement.New(strVar);

        if (image.user.id == MPData.user.id)
            res.Actions = this.Actions.Mine.New(image.id);
        else
            res.Actions = this.Actions.Other.New(image.id);

        res.ImageSource = "{0}/{1}_fw236".Format(imageHost, image.file.hash);
        res.ImageHeight = Math.ceil(image.file.height * 236 / image.file.width);
        res.ImageDescription = this.Description(image.description);
        res.ImageUrl = "/image/{0}".Format(image.id);
        var user = MPRender.User.New(image.user);
        res.UserHome = user.Home;
        res.UserAvt = user.Avt;
        res.UserName = user.Name;
        var p = MPRender.Package.New(image.package);
        res.PackageUrl = p.Url;
        res.PackageTitle = p.Title;

        res.Children[0] = res.Actions;
        res.Children[1] = res.ImageSource;
        res.Children[2] = res.ImageHeight;
        res.Children[3] = res.ImageDescription;
        res.Children[4] = res.ImageUrl;
        res.Children[5] = res.UserHome;
        res.Children[6] = res.UserAvt;
        res.Children[7] = res.UserName;
        res.Children[8] = res.PackageUrl;
        res.Children[9] = res.PackageTitle;

        return res;
    },
    Description: function (description)
    {
        return description.replace(/(#.*#)/g, function (word)
        {
            var w = $.trim(word.substring(1, word.length - 1));
            if (w == "")
                return word;

            return "<a href=\"/search/{0}\">{1}</a>".Format(encodeURIComponent(w), word);
        });
    },
    Actions: {
        Other: {
            New: function (id)
            {
                var strVar = "";
                strVar += "<div class=\"left\">";
                strVar += "    <div class=\"repin\" title=\"转存到我的图包\" data-id=\"{0}\">转存<\/div>";
                strVar += "<\/div>";
                strVar += "<div class=\"right\">";
                strVar += "    <div class=\"praise\" title=\"赞一个\" data-id=\"{0}\" >赞<\/div>";
                strVar += "<\/div>";

                var res = MPRenderElement.New(strVar);
                res.ID = id;
                res.Children[0] = res.ID;
                return res;
            }
        },
        Mine: {
            New: function (id)
            {
                var strVar = "";
                strVar += "<div class=\"right\">";
                strVar += "    <div class=\"edit\" title=\"编辑\" data-id=\"{0}\" >编辑<\/div>";
                strVar += "<\/div>";

                var res = MPRenderElement.New(strVar);
                res.ID = id;
                res.Children[0] = res.ID;
                return res;
            }
        }
    }
}