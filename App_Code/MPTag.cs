using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class MPTag
{
    public string Text { get; set; }
    public int ID { get; set; }

    public static void Create(string text)
    {
        text = text.Trim();
        if (text == "")
            return;
        DB.SExecuteNonQuery("insert ignore into tag (text) values (?)", text);
    }

    public MPTag(int id)
    {
        string sql = "select id,text from tag where id=?";

        var res = DB.SExecuteReader(sql, id);
        if (res.Count == 0)
            throw new MiaopassTagNotExistException();

        var row = res[0];
        ID = Convert.ToInt32(row[0]);
        Text = (string)row[1];
    }
}