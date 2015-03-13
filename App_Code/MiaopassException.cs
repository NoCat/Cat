using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class MiaopassException : Exception
{
    int _code = 500;
    public int Code
    {
        set
        {
            _code = value;
        }
        get
        {
            return _code;
        }
    }
    
    public MiaopassException(string msg)
        : base(msg)
    {        
    }
}
public class MiaopassNotLoginException : MiaopassException
{
    public MiaopassNotLoginException()
        : base("未登录,请登录后操作")
    {
        Code = 1;
    }
}

public class MiaopassUserNotExistException : MiaopassException
{
    public MiaopassUserNotExistException()
        : base("用户不存在")
    {
        Code = 2;
    }
}

public class MiaopassInvalidCookieException : MiaopassException
{
    public MiaopassInvalidCookieException()
        : base("无效cookie")
    {
        Code = 3;
    }
}

public class MiaopassEmailConflictException : MiaopassException
{
    public MiaopassEmailConflictException()
        : base("邮箱已使用")
    {
        Code = 4;
    }
}

public class MiaopassUsernameConflictException : MiaopassException
{
    public MiaopassUsernameConflictException()
        : base("用户名已使用")
    {
        Code = 5;
    }
}

public class MiaopassCreateUserFailedException : MiaopassException
{
    public MiaopassCreateUserFailedException()
        : base("新建用户失败")
    {
        Code = 6;
    }
}

public class MiaopassEmailInvalidException : MiaopassException
{
    public MiaopassEmailInvalidException()
        : base("邮箱地址无效")
    {
        Code = 7;
    }
}

public class MiaopassFileCreateFailedException:MiaopassException
{
    public MiaopassFileCreateFailedException():base("创建文件失败")
    {
        Code = 8;
    }
}

public class MiaopassFileNotExistException:MiaopassException
{
    public MiaopassFileNotExistException():base("文件不存在")
    {
        Code = 9;
    }
}

public class MiaopassTagEmptyException:MiaopassException
{
    public MiaopassTagEmptyException():base("标签为空")
    {
        Code = 10;
    }
}

public class MiaopassTagNotExistException:MiaopassException
{
    public MiaopassTagNotExistException():base("标签不存在")
    {
        Code = 11;
    }
}

public class MiaopassPackageNotExistException:MiaopassException
{
    public MiaopassPackageNotExistException():base("图包不存在")
    {
        Code = 12;
    }
}

public class MiaopassPackageNameConflictException:MiaopassException
{
    public MiaopassPackageNameConflictException():base("相同标题的图包已存在")
    {
        Code = 13;
    }
}

public class MiaopassPictureNotExistException:MiaopassException
{
    public MiaopassPictureNotExistException():base("图片不存在")
    {
        Code = 14;
    }
}

public class MiaopassLoginErrorException:MiaopassException
{
    public MiaopassLoginErrorException():base("邮箱或密码错误")
    {
        Code = 15;
    }
}

public class MiaopassAlreadyLoginException:MiaopassException
{
    public MiaopassAlreadyLoginException():base("已经登录了,请退出登录后操作")
    {
        Code = 16;
    }
}

public class MiaopassUploadErrorException:MiaopassException
{
    public MiaopassUploadErrorException():base("文件上传错误")
    {
        Code = 17;
    }
}

public class MiaopassInvalidImageFileException:MiaopassException
{
    public MiaopassInvalidImageFileException():base("图像文件无效或图像格式不符合")
    {
        Code = 18;
    }
}

public class MiaopassParamsErrorException:MiaopassException
{
    public MiaopassParamsErrorException():base("参数错误")
    {
        Code = 19;
    }
}

public class MiaopassDownloadFailedException:MiaopassException
{
    public MiaopassDownloadFailedException():base("文件下载失败")
    {
        Code = 20;
    }
}