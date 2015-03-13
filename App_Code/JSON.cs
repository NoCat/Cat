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

    public static object UserDetail(MPUser user,MPUser currentUser)
    {
        int followsCount=0;
        int followersCount = 0;
        int packagesCount = 0;
        int imagesCount = 0;
        int praiseCount = 0;
        bool followed=false;

        followsCount = Convert.ToInt32(DB.SExecuteScalar("select count(*) from following where userid=?",user.ID));
        followersCount = Convert.ToInt32(DB.SExecuteScalar("select count(*) from following where type=? and info=?", MPFollowingTypes.User, user.ID));
        packagesCount = Convert.ToInt32(DB.SExecuteScalar("select count(*) from package where userid=?", user.ID));
        imagesCount = Convert.ToInt32(DB.SExecuteScalar("select count(*) from image where userid=?", user.ID));
        praiseCount = Convert.ToInt32(DB.SExecuteScalar("select count(*) from praise where userid=?", user.ID));

        if(currentUser!=null && currentUser.ID!=user.ID)
        {
            var res = DB.SExecuteScalar("select userid from following where userid=? and type=? and info=?", currentUser.ID, MPFollowingTypes.User,user.ID );
            if (res != null)
                followed = true;
        }

        return new{
            id=user.ID,
            name=user.Name,
            default_head=user.DefaultHead,
            follows_count=followsCount,
            followers_count=followersCount,
            packages_count=packagesCount,
            images_count=imagesCount,
            praise_count=praiseCount,
            followed=followed
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

        var imageCount = DB.SExecuteScalar("select count(*) from image where packageid=?", package.ID);
        var followerCount = DB.SExecuteScalar("select count(*) from type=? and info=?", MPFollowingTypes.Package, package.ID);

        result.imageCount = Convert.ToInt32(imageCount);
        result.followedCount = Convert.ToInt32(followerCount);

        var user = new MPUser(package.UserID);
        result.user = User(user);

        if (currentUser != null && currentUser.ID!=user.ID)
        {
            bool praised = false;
            bool followed = false;

            if(DB.SExecuteScalar("select userid from praise where userid=? and type=? and info=?",currentUser.ID,MPPraiseTypes.Package,package.ID)!=null)
            {
                praised = true;
            }
            if (DB.SExecuteScalar("select userid from follow where userid=? and type=? and info=?", currentUser.ID, MPFollowingTypes.Package, package.ID) != null)
            {
                praised = true;
            }

            result.praised = praised;
            result.followed = followed;
        }

        return result;
    }

    public static object Image(MPImage image, MPUser currentUser)
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

        return new
        {
            id = image.ID,
            user = User(packageUser),
            package = Package(package),
            file = File(file),
            description = image.Description,
            praised = praised
        };
    }

    public static string Stringify(object obj)
    {
        return JsonConvert.SerializeObject(obj);
    }
}