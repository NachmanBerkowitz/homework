using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
namespace Nodeuser
{
    #region Users
    public class Users
    {
        #region Member Variables
        protected int _id;
        protected string _username;
        protected string _password;
        protected string _statement;
        #endregion
        #region Constructors
        public Users() { }
        public Users(string username, string password, string statement)
        {
            this._username=username;
            this._password=password;
            this._statement=statement;
        }
        #endregion
        #region Public Properties
        public virtual int Id
        {
            get {return _id;}
            set {_id=value;}
        }
        public virtual string Username
        {
            get {return _username;}
            set {_username=value;}
        }
        public virtual string Password
        {
            get {return _password;}
            set {_password=value;}
        }
        public virtual string Statement
        {
            get {return _statement;}
            set {_statement=value;}
        }
        #endregion
    }
    #endregion
}