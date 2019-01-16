var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use((req, res, next)=> {
    if (!req.session.signedIn) {
        res.redirect('/');
    }else{
        next();
    }
});

router.get('/',(req,res)=>{
    const username = req.session.user.username || 'unknown';
    res.redirect(`users/${username}`);
});

router.get('/:name',(req,res)=>{
    const {username,statement} = req.session.user || {username:'unknown',statement:'nothing'};

    res.render('user',{username,statement});
});

module.exports = router;
