var express = require('express');
var router = express.Router();

router.post('/addToCart', (req, res) => {
    require('../sessionCart')(req.session).add({id:req.body.id,count:+req.body.count || 1});
    res.redirect('/');
});

router.post('/ammendCart', (req, res) => {
    require('../sessionCart')(req.session).ammend({id:req.body.id,count:+req.body.count});
    res.redirect('/cart');
});

router.post('/removeFromCart', (req, res) => {
    require('../sessionCart')(req.session).remove(req.body.id);
    res.redirect('/cart');
});

router.get('/', (req, res) => {
    const items = require('../sessionCart')(req.session).getItems();

    res.render('cart',
        {
            items: items,
            empty: !items.length,
            grandTotal: items.reduce((a, b) => a + +b['subtotal'], 0).toFixed(2),
        });
});
module.exports = router;
