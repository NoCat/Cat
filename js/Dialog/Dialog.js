/// <reference path="../jquery.js" />
/// <reference path="../main.js" />
var MPDialog = {
    New: function (content)
    {
        var dialog = {};
        dialog.onClose = null;
        dialog.Content = $(content);
        var buttonClose = dialog.Content.find(".dialog-close");
        dialog.ButtonOK = dialog.Content.find(".ok");
        $("body").append(dialog.Content);
        MPCenter(dialog.Content.find(".dialog-box"), $(window));
        dialog.Close = function ()
        {
            dialog.Content.remove();
            if (dialog.onClose != null)
            {
                dialog.onClose();
            }
        }
        buttonClose.click(function ()
        {
            dialog.Close();
        })
        dialog.HideClose = function ()
        {
            buttonClose.hide();
        }
        return dialog;
    }
}