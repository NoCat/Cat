using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class MPImage
{
    public int ID { get; set; }
    public int PackageID { get; set; }
    public int FileID { get; set; }
    public DateTime CreatedTime { get; set; }
    public MPImageFromTypes FromType { get; set; }
    public int FromInfo { get; set; }
    public string Url { get; set; }
    public int UserID { get; set; }

    string _description = "";
    public string Description
    {
        get
        {
            return _description;
        }
        set
        {
            SetAttribute("Description", value);
            _description = value;
        }
    }
	public MPImage(int id)
	{
        Initialize("id=?", id);
	}

    public MPImage(int packageId,int fileId)
    {
        Initialize("packageid=? and fileid=?", packageId, fileId);
    }

    void Initialize(string condition,params object[] objs)
    {
        string sql = "select packageid,fileid,createdtime,fromtype,frominfo,url,description,id,userid from image where " + condition;
        var res = DB.SExecuteReader(sql, objs);

        if (res.Count == 0)
            throw new MiaopassPictureNotExistException();

        var row = res[0];
        PackageID = Convert.ToInt32(row[0]);
        FileID = Convert.ToInt32(row[1]);
        CreatedTime = Convert.ToDateTime(row[2]);
        FromType = (MPImageFromTypes)Convert.ToByte(row[3]);
        FromInfo = Convert.ToInt32(row[4]);
        Url = (string)row[5];
        _description = (string)row[6];
        ID = Convert.ToInt32(row[7]);
        UserID = Convert.ToInt32(row[8]);
    }
    
    public static void Create(int packageid,int fileid,int userid,MPImageFromTypes fromtype,int frominfo,string url,string description)
    {
        DB.SExecuteNonQuery("insert into image (packageid,fileid,userid,fromtype,frominfo,url,description) values (?,?,?,?,?,?,?)", packageid, fileid,userid, fromtype, frominfo, url, description);
    }

    void SetAttribute(string name,object value)
    {
        DB.SExecuteNonQuery("update picture set " + name + "=? where id=" + ID, value);
    }

    public void  AddTag(MPTag tag)
    {
        DB.SExecuteNonQuery("insert ignore into image_tag (imageid,tagid) values (?,?)", ID, tag.ID);
    }
}

public enum MPImageFromTypes:byte
{
    /// <summary>
    /// 自己上传
    /// </summary>
    Upload=0,
    /// <summary>
    /// 采集自其他网站
    /// </summary>
    Pick=1,
    /// <summary>
    /// 转采
    /// </summary>
    Repin=2
}