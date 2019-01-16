module.exports = function(session,username,password,statement,id){
    session.signUp = null;
    session.isFirst = false;
    session.signedIn = true;
    session.user = {
        username,
        password,
        statement
    };
    if(id){
        session.user.userID= id;
    }
};