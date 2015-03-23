using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.Dynamic;

/// <summary>
/// JSON 的摘要说明
/// </summary>
public static class JSON
{
    public static object User(MPUser user)
    {
        return new
        {
            id = user.ID,
            name = user.Name,
            default_head = user.DefaultHead
        };
    }

    public static object Comment(MPComment comment)
    {
        int id = comment.ID;
        MPUser user = new MPUser(comment.UserID);
        string text = comment.Text;
        string time = comment.CreatedTime.ToString();

        List<object> mentions = new List<object>();
        var res = DB.SExecuteReader("select id from comment_mention where commentid=?", id);
        foreach (var item in res)
        {
            mentions.Add(Mention(new MPCommentMention(Convert.ToInt32(item[0]))));
        }

        return new
        {
            id = id,
            user = User(user),
            text = text,
            time = time,
            mentions = mentions
        };
    }

    public static object Mention(MPCommentMention mention)
    {
        int id = mention.UserID;
        int pos = mention.Position;
        int len = mention.Length;
        return new
        {
            user_id = id,
            pos = pos,
            len = len
        };
    }

    public static object UserDetail(MPUser user, MPUser currentUser)
    {
        int followsCount = 0;
        int followersCount = 0;
        int packagesCount = 0;
        int imagesCount = 0;
        int praiseCount = 0;
        bool followed = false;

        followsCount = Convert.ToInt32(DB.SExecuteScalar("select count(*) from following where userid=?", user.ID));
        followersCount = Convert.ToInt32(DB.SExecuteScalar("select count(*) from following where type=? and info=?", MPFollowingTypes.User, user.ID));
        packagesCount = Convert.ToInt32(DB.SExecuteScalar("select count(*) from package where userid=?", user.ID));
        imagesCount = Convert.ToInt32(DB.SExecuteScalar("select count(*) from image where userid=?", user.ID));
        praiseCount = Convert.ToInt32(DB.SExecuteScalar("select count(*) from praise where userid=?", user.ID));

        if (currentUser != null && currentUser.ID != user.ID)
        {
            var res = DB.SExecuteScalar("select userid from following where userid=? and type=? and info=?", currentUser.ID, MPFollowingTypes.User, user.ID);
            if (res != null)
                followed = true;
        }

        return new
        {
            id = user.ID,
            name = user.Name,
            default_head = user.DefaultHead,
            follows_count = followsCount,
            followers_count = followersCount,
            packages_count = packagesCount,
            images_count = imagesCount,
            praise_count = praiseCount,
            followed = followed
        };
    }

    public static object File(MPFile file)
    {
        return new
        {
            hash = file.MD5,
            width = file.Width,
            height = file.Height
        };
    }

    public static object Package(MPPackage package)
    {
        return new
        {
            id = package.ID,
            title = package.Title
        };
    }

    public static object PackageDetail(MPPackage package, MPUser currentUser)
    {
        dynamic result = new ExpandoObject();
        result.id = package.ID;
        result.title = package.Title;
        result.description = package.Description;

        var thumbs = new List<object>();
        {
            var res = DB.SExecuteReader("select image.id from image left join package on image.id=package.coverid where packageid=? order by coverid desc ,image.id desc limit 4", package.ID);
            foreach (var item in res)
            {
                thumbs.Add(JSON.Image(new MPImage(Convert.ToInt32(item[0]))));
            }
        }
        result.thumbs = thumbs;

        var imageCount = DB.SExecuteScalar("select count(*) from image where packageid=?", package.ID);
        var followerCount = DB.SExecuteScalar("select count(*) from following where type=? and info=?", MPFollowingTypes.Package, package.ID);

        result.imageCount = Convert.ToInt32(imageCount);
        result.followerCount = Convert.ToInt32(followerCount);

        var user = new MPUser(package.UserID);
        result.user = User(user);

        if (currentUser != null && currentUser.ID != user.ID)
        {
            bool praised = false;
            bool followed = false;

            if (DB.SExecuteScalar("select userid from praise where userid=? and type=? and info=?", currentUser.ID, MPPraiseTypes.Package, package.ID) != null)
            {
                praised = true;
            }
            if (DB.SExecuteScalar("select userid from following where userid=? and type=? and info=?", currentUser.ID, MPFollowingTypes.Package, package.ID) != null)
            {
                praised = true;
            }

            result.praised = praised;
            result.followed = followed;
        }

        return result;
    }

    public static object ImageDetail(MPImage image, MPUser currentUser)
    {
        MPPackage package = new MPPackage(image.PackageID);
        MPFile file = new MPFile(image.FileID);
        MPUser packageUser = new MPUser(package.UserID);

        bool praised = false;
        if (currentUser != null)
        {
            if (DB.SExecuteScalar("select userid from praise where userid=? and type=? and info=?", currentUser.ID, MPPraiseTypes.Image, image.ID) != null)
            {
                praised = true;
            }
        }

        List<object> comments = new List<object>();
        var res = DB.SExecuteReader("select id from comment where imageid=?", image.ID);
        foreach (var item in res)
        {
            comments.Add(Comment(new MPComment(Convert.ToInt32(item[0]))));
        }

        string time = image.CreatedTime.ToString();

        return new
        {
            id = image.ID,
            user = User(packageUser),
            package = Package(package),
            file = File(file),
            description = image.Description,
            praised = praised,
            comments = comments,
            time = time
        };
    }

    public static object Image(MPImage image)
    {
        return new
        {
            id = image.ID,
            file = File(new MPFile(image.FileID))
        };
    }
    public static string Stringify(object obj)
    {
        return JsonConvert.SerializeObject(obj);
    }
}