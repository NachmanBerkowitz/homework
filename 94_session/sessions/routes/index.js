var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    if(req.session.signedIn){
        res.redirect('/users');
    }else{
        res.render('notSignedIn')
    }
});





module.exports = router;