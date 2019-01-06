var express = require('express');
var router = express.Router();
const bufferList = require('bl');
const objRewrite = require('../public/javascripts/rewriteApiKeys');
const request = require('request');

const key = require('../apikey');

router.get('/choices', (req, res) => {
    const symbol = req.query.symbol;
    if (!symbol) return res.render('choices');
    const bl = new bufferList();
    request
        .get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${key}`)
        .on('data', data => {
            bl.append(data);
        })
        .on('complete', () => {
            const choices = JSON.parse(bl.toString())
                .bestMatches.reduce((arry, obj) => {
                    const newObj = objRewrite(obj);
                    if (parseFloat(newObj.matchScore) >= 0.5) {
                        arry.push(newObj);
                    }
                    return arry;
                }, []);
            res.render('choices', { choices, key });
        });
});
router.get('/quote', (req, res) => {
    const symbol = req.query.symbol;
    if (!symbol) return res.render('quote');
    const bl = new bufferList();
    request
        .get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`)
        .on('data', data => {
            bl.append(data);
        })
        .on('complete', () => {
            var quote = JSON.parse(bl.toString())['Global Quote'];
            quote = objRewrite(quote);
            res.render('quote', { quote, company: req.query.name });
        });
});
module.exports = router;
