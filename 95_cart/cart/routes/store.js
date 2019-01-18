var express = require('express');
var router = express.Router();

router.get('/', (req, res,)=> {
    res.render('store', {
        items: require('../items'),
        css: ['store'],
    });
});

module.exports = router;