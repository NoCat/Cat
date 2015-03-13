var MPRender = {};

MPRender.User = {
    User: {
        New: function (user)
        {
            var res = {};
            res.Home = "/user/{0}".Format(user.id);
            if (user.default_head == true)
                res.Avt = "{0}/avt/0";
            else
                res.Avt = "{0}/avt/{1}".Format(imageHost, user.id);
            res.Name = user.name;
            return res;
        }
    },
    Package: {
        New: function (p)
        {
            var res = {};
            res.Url = "/package/" + p.id;
            res.Title = p.title;
            return res;
        }
    }
}