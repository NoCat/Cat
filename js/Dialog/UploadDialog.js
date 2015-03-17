MPUploadDialog = {
    New: function ()
    {
        var dialog = MPTitleDialog.New('<div class="dialog-mask"><div class="dialog-box"><div class="dialog-title"><span class="text">上传图片</span><div class="dialog-close"></div></div><div class="dialog-content"><div class="upload-dialog"><div class="select"><div class="img"></div><div class="button">选择图片</div><div class="more">请选择上传的图片，支持jpg和png图片</div><input type="file" class="upload"></div><div class="process"><div class="img"></div><div class="percentage">正在上传(0%)...</div></div></div></div></div></div>', "上传图片");
        dialog.Content.find(".upload").change(function ()//上传按钮
        {
            UpLoad(this);
        })
        dialog.hash = null;
        dialog.filename = "";
        dialog.onSuccess = null;
        function UpLoad(a)
        {
            var fileList = a.files;
            var file = fileList[0];
            dialog.filename = file.name;
            var chunk = 0;
            var chunks = Math.ceil(file.size / 128 / 1024);
            UpBegin(function (name)
            {
                SendChunk(0, chunks, file, name, function (hash)
                {
                    dialog.hash = hash;
                    if (dialog.onSuccess != null)
                    {
                        dialog.onSuccess();
                    }
                    dialog.Close();
                });
            });

            var select = dialog.Content.find(".select");
            var process = dialog.Content.find(".process");

            function UpBegin(callback)
            {
                var tfilename = $.post(host + "/ajax/upload-begin", {}, function (data)
                {
                    if (data.code == 0)
                    {
                        select.hide();
                        dialog.HideClose();
                        process.show();
                        callback(data.name);
                    }
                }, "json");
            }

            function SendChunk(chunk, chunks, file, tfilename, callback)
            {
                var xhr = new XMLHttpRequest();
                xhr.open("post", host + "/ajax/upload-chunk?chunks=" + chunks + "&chunk=" + chunk + "&name=" + tfilename);
                var begin = chunk * 1024 * 128;
                var end = begin + 1024 * 128;
                xhr.send(file.slice(begin, end));
                xhr.onload = function ()
                {
                    var d = JSON.parse(xhr.responseText);
                    if (d.code == 0)
                    {
                        if (chunk == chunks - 1)
                        {
                            process.find(".percentage").text("正在上传(100%)...");
                            callback(d.hash);
                            return;
                        }
                        else
                        {
                            chunk++;
                            process.find(".percentage").text("正在上传(" + Math.ceil(chunk / chunks * 100) + "%)...");
                            SendChunk(chunk, chunks, file, tfilename, callback);
                        }
                    }
                    else
                    {
                        var box = MPMessageBox.New("error", "文件上传失败>_< 请重试");
                        box.HideClose();
                        box.onOK = function () {
                            box.Close();
                            dialog.Close();
                        }
                        return;
                    }
                }
            }
        }
        return dialog;
    }
}
