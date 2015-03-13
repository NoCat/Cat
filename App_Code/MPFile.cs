using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Windows.Media.Imaging;

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
        BitmapSource bitmap = null;
        string fileType = null;
        try
        {
            bitmap = Tools.LoadBitmap(fileStream, out fileType);
        }
        catch (BadImageFormatException)
        {
            throw new MiaopassInvalidImageFileException();
        }

        //检查图像是否为jpg或者png
        if (fileType.Contains("image/jpeg") == false && fileType.Contains("image/png") == false)
        {
            throw new MiaopassInvalidImageFileException();
        }

        if (//上传原图
            OssFile.Create(md5, fileStream) == false ||
            //上传235定宽
            OssFile.Create(md5 + "_fw235", bitmap.Thumb(235, 0).SaveAsJpeg()) == false ||
            //上传235方形
            OssFile.Create(md5 + "_sq235", bitmap.Crop(235).SaveAsJpeg()) == false ||
            //上传75方形
            OssFile.Create(md5 + "_sq75", bitmap.Crop(75).SaveAsJpeg()) == false ||
            //上传658定宽
            OssFile.Create(md5 + "_fw658", (bitmap.PixelWidth <= 658 ? bitmap.SaveAsJpeg() : bitmap.Thumb(658, 0).SaveAsJpeg())) == false ||
            //上传78定宽
            OssFile.Create(md5 + "_fw78", bitmap.Thumb(78, 0).SaveAsJpeg()) == false)
        {
            throw new MiaopassFileCreateFailedException();
        }

        try
        {
            return DB.SInsert("insert into file (width,height,md5) values (?,?,?)", bitmap.PixelWidth, bitmap.PixelHeight, md5);
        }
        catch (MySql.Data.MySqlClient.MySqlException)
        {
            throw new MiaopassFileCreateFailedException();
        }
    }
}