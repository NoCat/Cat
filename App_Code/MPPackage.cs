using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class MPPackage
{
    public int ID { get; set; }
    public int UserID { get; set; }

    string _title = "";
    public string Title
    {
        get
        {
            return _title;
        }
        set
        {
            SetAttribute("Title", value);
            _title = value;
        }
    }

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

    int _coverID = 0;
    public int CoverID
    {
        get
        {
            return _coverID;
        }
        set
        {
            SetAttribute("CoverID", value);
            _coverID = value;
        }
    }

	public MPPackage(int id)
	{
        var res = DB.SExecuteReader("select userid,title,description,coverid from package where id=?", id);

        if (res.Count == 0)
            throw new MiaopassPackageNotExistException();

        var row = res[0];
        ID = id;
        UserID = Convert.ToInt32(row[0]);
        _title = (string)row[1];
        _description = (string)row[2];
        _coverID = Convert.ToInt32(row[3]);
	}

    public static void Create(int userid,string title)
    {
        try
        {
            DB.SExecuteNonQuery("insert into package (userid,title,description,coverid) values (?,?,'',0)", userid, title);
        }
        catch(MySql.Data.MySqlClient.MySqlException)
        {
            throw new MiaopassPackageNameConflictException();
        }
    }

    void SetAttribute(string name,object value)
    {
        DB.SExecuteNonQuery("update package set " + name + "=? where id="+ID, value);
    }
}