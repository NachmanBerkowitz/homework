using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
namespace Nodeuser
{
    #region Contacts
    public class Contacts
    {
        #region Member Variables
        protected int _id;
        protected string _firstname;
        protected string _lastname;
        protected string _email;
        protected unknown _phone;
        #endregion
        #region Constructors
        public Contacts() { }
        public Contacts(string firstname, string lastname, string email, unknown phone)
        {
            this._firstname=firstname;
            this._lastname=lastname;
            this._email=email;
            this._phone=phone;
        }
        #endregion
        #region Public Properties
        public virtual int Id
        {
            get {return _id;}
            set {_id=value;}
        }
        public virtual string Firstname
        {
            get {return _firstname;}
            set {_firstname=value;}
        }
        public virtual string Lastname
        {
            get {return _lastname;}
            set {_lastname=value;}
        }
        public virtual string Email
        {
            get {return _email;}
            set {_email=value;}
        }
        public virtual unknown Phone
        {
            get {return _phone;}
            set {_phone=value;}
        }
        #endregion
    }
    #endregion
}