/// <reference path="Dialog.js" />
MPTitleDialog = {
    New: function (content, titleText)
    {
        titleText = titleText ? titleText : "";
        var dialog = MPDialog.New(content);
        var title = dialog.Content.find(".dialog-title .text");
        dialog.Title = function (t)
        {
            if (arguments.length==0)
            {
                return title;
            }
            else
            {
                title.text(t);
            }
        }
        dialog.Title(titleText);
        return dialog;
    }
}