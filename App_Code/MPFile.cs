using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;

public class MPFile
{
    public int ID { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public string MD5 { get; set; }

    public MPFile(string md5)
    {
        Initialize(md5);
    }
    public MPFile(int id)
    {
        Initialize(id);
    }

    void Initialize(object obj)
    {
        string sql = "select id,width,height,md5 from file where {0}=?";
        if (obj is int)
        {
            sql = string.Format(sql, "id");
        }
        else if (obj is string)
        {
            sql = string.Format(sql, "md5");
        }

        var res = DB.SExecuteReader(sql, obj);
        if (res.Count == 0)
        {
            throw new MiaopassFileNotExistException();
        }

        var row = res[0];
        ID = Convert.ToInt32(row[0]);
        Width = Convert.ToInt32(row[1]);
        Height = Convert.ToInt32(row[2]);
        MD5 = (string)row[3];
    }
    public static int Create(Stream fileStream)
    {
        fileStream.Position = 0;
        //计算文件md5
        string md5 = Tools.FileMd5(fileStream);

        //检查数据库文件是否存在
        var res = DB.SExecuteScalar("select id from file where md5=?", md5);
        if (res != null)
        {
            return Convert.ToInt32(res);
        }

        //检查文件是否图像文件
        fileStream.Position = 0;
        Image bitmap = null;
        try
        {
            bitmap = Image.FromStream(fileStream);
        }
        catch (BadImageFormatException)
        {
            throw new MiaopassInvalidImageFileException();
        }

        //检查图像是否为jpg,png,bmp
        if (bitmap.RawFormat.Equals(ImageFormat.Bmp) == false && bitmap.RawFormat.Equals(ImageFormat.Png) == false && bitmap.RawFormat.Equals(ImageFormat.Jpeg) == false)
            throw new MiaopassInvalidImageFileException();

        //上传原始的(如果格式非jpg,则转换成jpg,如果图片大于800w像素,则压缩小于800w像素)图片
        int threshold = 8000000;
        int pixels = bitmap.Width * bitmap.Height;

        if (pixels > threshold)
        {
            int w = (int)(bitmap.Width / Math.Sqrt(1.0 * pixels / threshold));
            using (var t = bitmap.FixWidth(w))
            {
                OssFile.Create(md5, t.SaveAsJpeg());
            }
        }
        else
        {
            OssFile.Create(md5, bitmap.SaveAsJpeg());
        }


        //上传236定宽
        using (var t = bitmap.FixWidth(236))
        {
            OssFile.Create(md5 + "_fw236", t.SaveAsJpeg());
        }

        //上传236方形
        using (var t = bitmap.Square(236))
        {
            OssFile.Create(md5 + "_sq236", t.SaveAsJpeg());
        }

        //上传75方形
        using (var t = bitmap.Square(75))
        {
            OssFile.Create(md5 + "_sq75", t.SaveAsJpeg());
        }

        //上传658定宽
        using (var t = bitmap.FixWidth(658))
        {
            OssFile.Create(md5 + "_fw658", t.SaveAsJpeg());
        }

        //上传78定宽
        using (var t = bitmap.FixWidth(78))
        {
            OssFile.Create(md5 + "_fw78", t.SaveAsJpeg());
        }

        try
        {
            return DB.SInsert("insert into file (width,height,md5) values (?,?,?)", bitmap.Width, bitmap.Height, md5);
        }
        catch (MySql.Data.MySqlClient.MySqlException)
        {
            throw new MiaopassFileCreateFailedException();
        }
    }
}