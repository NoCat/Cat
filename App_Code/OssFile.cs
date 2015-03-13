using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Aliyun.OpenServices.OpenStorageService;
using System.IO;
using System.Configuration;

static public class OssFile
{
    static OssClient _ossClient = null;
    static string _ossAccessId = ConfigurationManager.AppSettings["OssAccessId"];
    static string _ossAccessKey = ConfigurationManager.AppSettings["OssAccessKey"];
    static string _ossPublicBucketName = ConfigurationManager.AppSettings["OssPublicBucketName"];
    static string _ossPrivateBucketName = ConfigurationManager.AppSettings["OssPrivateBucketName"];
    static string _ossEndPoint = ConfigurationManager.AppSettings["OssEndPoint"];

    static OssFile()
    {
        _ossClient = new OssClient(_ossEndPoint, _ossAccessId, _ossAccessKey);
    }

    public static bool Create(string path, Stream s)
    {
        int count = 0;
        while (count < 5)
        {
            try
            {
                s.Position = 0;
                _ossClient.PutObject(_ossPublicBucketName, path, s, new ObjectMetadata());
                break;
            }
            catch
            {
                count++;
            }
        }

        if (count < 5)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public static void Delete(string path)
    {
        _ossClient.DeleteObject(_ossPublicBucketName, path);
    }

    public static void Move(string source, string destination)
    {
        var request = new CopyObjectRequest(_ossPublicBucketName, source, _ossPublicBucketName, destination);

        _ossClient.CopyObject(request);
        Delete(source);
    }

    public static bool IsFileExist(string path)
    {
        try
        {
            _ossClient.GetObjectMetadata(_ossPublicBucketName, path);
            return true;
        }
        catch { return false; }

    }

    public static Stream Open(string path)
    {
        Stream s = new MemoryStream();
        _ossClient.GetObject(new GetObjectRequest(_ossPublicBucketName, path), s);
        s.Position = 0;
        return s;
    }

    public static ObjectListing ListObjects()
    {
        return _ossClient.ListObjects(_ossPublicBucketName);
    }

    public static ObjectListing ListObjects(string maker)
    {
        ListObjectsRequest request = new ListObjectsRequest(_ossPublicBucketName);
        request.Marker = maker;
        return _ossClient.ListObjects(request);
    }
}