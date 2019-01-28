const mongo = require('mongodb');

mongo.MongoClient('mongodb://localhost:27017',{ useNewUrlParser: true }).connect((err, client) => {
    console.log('CONNECTING');
    if (err) {
        console.error(err);
    }

    const contactsDB = client.db('contacts');
    module.exports = contactsDB;
});
