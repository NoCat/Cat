using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Module;

namespace Module
{
    public class Member
    {
        #region 静态函数
        public static Member GetMemberBySinaUserID(Int64 sinaUserId)
        {
            var res = DB.SExecuteScalar("select ID from t_user where SinaUserID=?", sinaUserId);
            if (res != null)
                return new Member(Convert.ToInt32(res));
            return null;
        }

        public static Member CreateBySinaUserID(Int64 sinaUserId, string username)
        {
            if (IsUserNameExists(username))
            {
                throw new MiaopassException("该用户名已使用");
            }

            try
            {
                int id = DB.SInsert("insert into t_user (SinaUserID,Username) values (?,?)", sinaUserId, username);
                return new Member(id);
            }
            catch
            {
                throw new MiaopassException("新建用户失败!");
            }
        }

        public static Member Login(string emailAddress, string password)
        {
            object res = DB.SExecuteScalar("select ID from t_user where RegistEmailAddress=? and PassWord=?", emailAddress, Tools.Md5(password));

            if (res == null)
            {
                throw new MiaopassException("帐号或密码错误");
            }
            else
            {
                return new Member(Convert.ToInt32(res));
            }
        }

        public static Member Login(string cookieValue)
        {
            DB.SExecuteNonQuery("delete from t_login_cookie where now()>Expire");
            object res = DB.SExecuteScalar("select UserID from t_login_cookie where CookieValue=?", cookieValue);
            if (res == null)
            {
                throw new MiaopassInvalidCookieException();
            }
            else
            {
                return new Member(Convert.ToInt32(res));
            }
        }

        //注册,注册成功返回一个Member实例,失败抛出异常
        public static Member Create(string password, string emailAddress, string username)
        {
            if (IsRegistEmailAddressExists(emailAddress) == -1)
            {
                throw new MiaopassEmailConflictException();
            }

            if (IsUserNameExists(username))
            {
                throw new MiaopassUsernameConflictException();
            }

            try
            {
                using (DB db = new DB())
                {
                    db.ExecuteNonQuery("insert into t_user(PassWord,RegistEmailAddress,UserName) values(?,?,?)", Tools.Md5(password), emailAddress, username);
                    Member member = new Member(db.GetLastInsertId());
                    return member;
                }
            }
            catch ( MySql.Data.MySqlClient.MySqlException)
            {
                throw new MiaopassCreateUserFailedException();
            }
        }

        //找回密码,如果emailAddress存在则发送重置密码邮件,否则抛出异常 
        public static void FindPassword(string emailAddress)
        {
            int userid = IsRegistEmailAddressExists(emailAddress);
            string token = null;
            if (userid == -1)
            {
                throw new MiaopassEmailInvalidException();
            }
            using (DB db = new DB())
            {
                db.ExecuteNonQuery("delete from t_resetpwd where now()<Expire");
                while (true)
                {
                    try
                    {
                        token = Tools.BytesToString(Guid.NewGuid().ToByteArray());
                        db.ExecuteNonQuery("insert into t_resetpwd (UserID, Token,Expire) values(?,?,?)", userid, token, DateTime.Now.AddHours(3));
                        break;
                    }
                    catch { }
                }
            }
            string resetUrl = string.Format("http://www.miaopass.net/resetpwd.aspx?method=reset&id={0}&token={1}", userid, token);
            Mail.SendResetPasswordEmail(emailAddress, resetUrl);
        }

        //检测昵称是否存在,ajax和注册时调用
        public static bool IsUserNameExists(string username)
        {
            if (DB.SExecuteScalar("select ID from t_user where UserName=?", username) == null)
                return false;
            else
                return true;
        }

        //检测注册邮箱是否已经存在
        public static int IsRegistEmailAddressExists(string emailAddress)
        {
            var res = DB.SExecuteScalar("select ID from t_user where RegistEmailAddress=?", emailAddress);
            if (res == null)
                return -1;
            else
                return Convert.ToInt32(res);
        }
        #endregion

        #region 构造函数
        void Initialize(int userId)
        {
            var res = DB.SExecuteReader("select id,username,password,athority,RegistEmailAddress,DefaultHead,Signature,SinaUserID from t_user where id=?", userId);
            if (res.Count == 0)
                throw new MiaopassUserNotExistException();
            ID = userId;
            _username = (string)res[0][1];
            _password = res[0][2] as byte[];
            Authority = (Authorities)Convert.ToByte(res[0][3]);
            _registEmailAddress = (string)res[0][4];
            _defualtHead = Convert.ToByte(res[0][5]);
            _signature = (string)res[0][6];
            SinaUserID = Convert.ToInt64(res[0][7]);
        }

        public Member(int userId)
        {
            Initialize(userId);
        }

        #endregion

        #region 实例函数
        //使用ID从数据库获取会员属性
        private object GetMemberAttribute(string attributeName)
        {
            string sql = string.Format("select {0} from t_user where Id=?", attributeName);
            object o = DB.SExecuteScalar(sql, ID);
            if (o == null)
            {
                throw new Exception();
            }
            return o;
        }

        //使用ID从数据库设置会员属性
        private void SetMemberArrribute(string atrributeName, object value)
        {
            using (DB db = new DB())
            {
                string sql = string.Format("update t_user set {0}=? where id=?", atrributeName);
                db.ExecuteNonQuery(sql, value, ID);
            }
        }

        public string SetCookie()
        {
            string cookieValue = string.Format("{0}_{1}", ID, Guid.NewGuid().ToString("N"));
            using (DB db = new DB())
            {
                db.ExecuteNonQuery("insert into t_login_cookie(CookieValue,Expire,UserID) values (?,?,?)", cookieValue, DateTime.Now.AddMonths(1), ID);
            }
            return cookieValue;
        }

        #endregion

        #region 属性
        //ID
        public int ID { private set; get; }
        //权限
        Authorities _authority;
        public Authorities Authority
        {
            set
            {
                SetMemberArrribute("Authority", value);
                _authority = value;
            }
            get
            {
                return _authority;
            }
        }
        //用户名
        string _username;
        public string UserName
        {
            set
            {
                try
                {
                    SetMemberArrribute("username", value);
                    _username = value;
                }
                catch (MySql.Data.MySqlClient.MySqlException)
                {
                    throw new MiaopassUsernameConflictException();
                }
            }
            get
            {
                return _username;
            }
        }
        //密码
        byte[] _password;
        public byte[] PassWord
        {
            set
            {
                SetMemberArrribute("password", value);
                _password = value;
            }
            get
            {
                return _password;
            }
        }
        //注册邮箱
        string _registEmailAddress;
        public string RegistEmailAddress
        {
            set
            {
                try
                {
                    SetMemberArrribute("registemailaddress", value);
                    _registEmailAddress = value;
                }
                catch (MySql.Data.MySqlClient.MySqlException)
                {
                    throw new MiaopassEmailConflictException();
                }
            }
            get
            {
                return _registEmailAddress;
            }
        }
        //默认头像
        byte _defualtHead;
        public byte DefaultHead
        {
            set
            {
                SetMemberArrribute("defaulthead", value);
                _defualtHead = value;
            }
            get
            {
                return _defualtHead; 
        } }
        //头像路径
        public string HeadPath
        {
            get
            {
                if (DefaultHead != 255)
                {
                    return Tools.ImageServerHost + "p/" + ID + ".jpg";
                }
                else
                {
                    return Tools.ImageServerHost + "p/head" + DefaultHead + ".jpg";
                }
            }
        }
        //个性签名
        string _signature;
        public string Signature
        {
            set
            {
                SetMemberArrribute("signature", value);
                _signature = value;
            }
            get
            {
                return _signature;
            }
        }
        //新浪用户ID
        public Int64 SinaUserID { set; get; }
        #endregion
    }

    public enum Authorities : byte
    {
        Administrator = 0, User = 1, None = 100
    }
}
