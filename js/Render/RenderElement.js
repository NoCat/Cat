var MPRenderElement = {
    New: function (strVal)
    {
        strVal = strVal ? strVal : "";
        var res = {};
        res.Children = [];
        res.HTML = function ()
        {
            var n = res.Children.length;
            var htmlList = [];
            for (var i = 0; i < n; i++)
            {
                if(res.Children[i].HTML!=undefined)
                    htmlList.push(res.Children[i].HTML());
                else
                    htmlList.push(res.Children[i]);                    
            }
            return strVal.Format(htmlList);
        }
        res.Run = function ()
        {
            var n = res.Children.length;
            for(var i=0;i<n;i++)
            {

            }
        }
        return res;
    }
}