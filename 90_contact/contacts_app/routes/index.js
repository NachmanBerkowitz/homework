var express = require('express');
var router = express.Router();
const contacts = require('../contacts/contacts');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/contacts', function(req, res) {
    res.render('index', { title: 'Express', contacts: contacts });
});

router.get('/api/contacts', (req,res)=>{
    res.send(contacts);
});

router.get('/add' , (req,res)=>{
    res.render('form');
});

router.post('/add',(req,res)=>{
    contacts.push(req.body);
    
    res.redirect('/contacts');
});
module.exports = router;
