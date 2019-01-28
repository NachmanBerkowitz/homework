var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

router
    .route('/')
    .get((req, res, next) => {
        const contactsCollection = require('../database').collection('contacts');
        contactsCollection.find().toArray((err, results) => {
            if (err) {
                return next(err);
            }
            res.send(results);
        });
    })
    .post((req, res) => {
        const contactsCollection = require('../database').collection('contacts');
        contactsCollection
            .insertOne({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
            })
            .then(result => {
                req.body._id = result.ops[0]._id;
                res.status(201).send(JSON.stringify(req.body));
            });
    });
router.get('/exampleId', (req, res) => {
    const contactsCollection = require('../database').collection('contacts');
    contactsCollection
        .aggregate([{ $sample: { size: 1 } }])
        .toArray()
        .then(result => {
            res.send(result[0]._id);
        })
        .catch(err => res.status(500).send(err.message));
});
router
    .route('/:id')
    .delete((req, res) => {
        const contactsCollection = require('../database').collection('contacts');
        contactsCollection
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then(response => {
                if (response.result.n === 1) {
                    res.status(204).end();
                }
            })
            .catch(err => res.status(500).send(err.message));
    })
    .get((req, res) => {
        const contactsCollection = require('../database').collection('contacts');
        contactsCollection
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(result => {
                if (result) {
                    res.send(result);
                } else {
                    return res.status(404).send(`No contact with id ${req.params.id}`);
                }
            })
            .catch(err => res.status(500).send(err.message));
    })
    .put((req, res) => {
        const contactsCollection = require('../database').collection('contacts');
        contactsCollection
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
            .then(response => {
                if (response.result.n === 1) {
                    res.send(200);
                } else {
                    res.send(204);
                }
            })
            .catch(err => res.status(500).send(err.message));
    });

module.exports = router;
