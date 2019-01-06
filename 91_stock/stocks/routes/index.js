var express = require('express');
var router = express.Router();


global.choices;
/* GET home page. */
router.get('/', function(req, res) {
    res.redirect('/search');
});

router
    .route('/search')
    .get(function(req, res) {
        res.render('search');
    })
    .post((req, res) => {
        const symbol = req.body.search;
        res.redirect(`/stocks/choices?symbol=${symbol}`);
    });
module.exports = router;
