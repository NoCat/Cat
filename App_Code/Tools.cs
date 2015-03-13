using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Collections.Specialized;
using System.IO;
using System.Security.Cryptography;
using System.Windows.Media.Imaging;
using System.Windows.Media;
using System.Windows;
using System.Configuration;

public static class Tools
{
    public static string ImageServerHost = ConfigurationManager.AppSettings["BaseUrl"];
    public static string Host = ConfigurationManager.AppSettings["Host"];
    public static string MiaopassString = " - 喵帕斯~(*´▽｀)ノ";

    public static byte[] Md5(string str)
    {
        var buffer = Encoding.UTF8.GetBytes(str);
        return MD5.Create().ComputeHash(buffer);
    }

    public static string SHA256Hash(string str)
    {
        return BytesToString(SHA256.Create().ComputeHash(UTF8Encoding.UTF8.GetBytes(str)));
    }

    public static string ComputeFileSize(int size)
    {
        if (size < 1.0 * 1024 * 0.9)
            return size + "字节";
        else if (size < 1.0 * 1024 * 1024 * 0.9)
            return (int)(1.0 * size / 1024) + "KB";
        else if (size < 1.0 * 1024 * 1024 * 1024 * 0.9)
            return (int)(1.0 * size / 1024 / 1024) + "MB";
        else if (size < 1.0 * 1024 * 1024 * 1024 * 1024 * 0.9)
            return (int)(1.0 * size / 1024 / 1024 / 1024) + "GB";
        else
            return (int)(1.0 * size / 1024 / 1024 / 1024 / 1024) + "TB";
    }

    public static string FileMd5(string path)
    {
        using (var fs = File.OpenRead(path))
        {
            return FileMd5(fs);
        }
    }

    public static string FileMd5(Stream s)
    {
        s.Position = 0;
        return BytesToString(MD5.Create().ComputeHash(s));
    }

    public static byte[] StringToBytes(string ss)
    {
        byte[] bytes = new byte[16];
        try
        {
            for (int i = 0; i < 16; i++)
            {
                bytes[i] = Convert.ToByte(ss.Substring(i * 2, 2), 16);
            }
        }
        catch
        {
            throw new Exception("无法转换");
        }

        return bytes;
    }
    public static string BytesToString(byte[] bytes)
    {
        StringBuilder sb = new StringBuilder();
        foreach (byte b in bytes)
        {
            sb.Append(b.ToString("X2"));
        }
        return sb.ToString();
    }

    public static string GetStringFromRequest(string request)
    {
        if (request == null)
            throw new MiaopassParamsErrorException();
        return HttpContext.Current.Server.HtmlDecode(request).Trim();
    }

    public static int GetInt32FromRequest(string request)
    {
        if (request == null)
            throw new MiaopassParamsErrorException();
        try
        {
            return Convert.ToInt32(request);
        }
        catch
        {
            throw new MiaopassParamsErrorException();
        }
    }

    public static int GetId(byte[] token, DB db)
    {
        object o = db.ExecuteScalar("select id from t_user where token=?", token);
        if (o == null)
        {
            return 0;
        }
        else
        {
            db.ExecuteNonQuery("update t_user set last_access_time=now() where id =?", Convert.ToInt32(o));
            return Convert.ToInt32(o);
        }
    }
    public static void Write(this Stream stream, Stream input)
    {
        int bufferSize = 1024 * 4;
        int a = bufferSize;
        byte[] buffer = new byte[bufferSize];
        while (a == bufferSize)
        {
            a = input.Read(buffer, 0, bufferSize);
            stream.Write(buffer, 0, a);
        }
    }

    //扩展bitmap
    public static BitmapSource Thumb(this BitmapSource source, int width, int height)
    {
        double scaleX = 1.0 * width / source.PixelWidth;
        double scaleY = 1.0 * height / source.PixelHeight;
        if (width == 0)
        {
            scaleX = scaleY;
        }
        if (height == 0)
        {
            scaleY = scaleX;
        }

        ScaleTransform s = new ScaleTransform(scaleX, scaleY);

        TransformedBitmap tb = new TransformedBitmap(source, s);
        return tb;
    }

    public static Stream SaveAsJpeg(this BitmapSource source, int qualityLevel = 92)
    {
        MemoryStream s = new MemoryStream();
        source.SaveAsJpeg(s);
        return s;
    }

    public static void SaveAsJpeg(this BitmapSource source, Stream s, int qualityLevel = 92)
    {
        //var frame = BitmapFrame.Create(source);            
        DrawingVisual draw = new DrawingVisual();
        var dc = draw.RenderOpen();
        Rect rect = new Rect(0, 0, source.Width, source.Height);
        dc.DrawRectangle(Brushes.White, null, rect);
        dc.DrawImage(source, rect);
        dc.Close();

        RenderTargetBitmap target = new RenderTargetBitmap(source.PixelWidth, source.PixelHeight, source.DpiX, source.DpiY, PixelFormats.Pbgra32);
        target.Render(draw);

        JpegBitmapEncoder encoder = new JpegBitmapEncoder() { QualityLevel = qualityLevel };
        encoder.Frames.Add(BitmapFrame.Create(target));
        encoder.Save(s);
    }

    public static BitmapSource Crop(this BitmapSource source, int left, int top, int width, int height)
    {
        return new CroppedBitmap(source, new Int32Rect(left, top, width, height));
    }

    public static BitmapSource Crop(this BitmapSource source, int size)
    {
        BitmapSource resize = null;
        if (source.PixelWidth > source.PixelHeight)
        {
            resize = source.Thumb(0, size);
        }
        else
        {
            resize = source.Thumb(size, 0);
        }

        int left = 0;
        int top = 0;
        int width = 0;
        int height = 0;

        if (resize.PixelWidth > resize.PixelHeight)
        {
            top = 0;
            width = resize.PixelHeight;
            height = resize.PixelHeight;
            left = (resize.PixelWidth - resize.PixelHeight) / 2;
        }
        else
        {
            left = 0;
            width = resize.PixelWidth;
            height = resize.PixelWidth;
            top = (resize.PixelHeight - resize.PixelWidth) / 2;
        }
        return new CroppedBitmap(resize, new Int32Rect(left, top, width, height));
    }
    public static BitmapSource LoadBitmap(Stream stream, out string type)
    {
        stream.Position = 0;
        var decoder = BitmapDecoder.Create(stream, BitmapCreateOptions.None, BitmapCacheOption.OnLoad);
        type = decoder.CodecInfo.MimeTypes;
        return decoder.Frames[0];
    }

    public static BitmapSource LoadBitmap(Stream stream)
    {
        string type = "";
        return LoadBitmap(stream, out type);
    }
}
