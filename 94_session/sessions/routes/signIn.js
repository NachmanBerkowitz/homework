var express = require('express');
var router = express.Router();
const pool = require('../dbConnectPool');

router
    .route('/')
    .get((req, res) => {
        const isFirst = req.query.first;
        if (isFirst) {
            req.session.isFirst = true;
        }
        res.render('signIn', { isFirst });
    })
    .post((req, res) => {
        const { username, password } = { ...req.body };
        if (req.session.isFirst) {
            pool((err, connection) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                connection.query('SELECT 1 FROM users WHERE username=?', [username], (err, result) => {
                    connection.release();
                    if (result.length) {
                        res.render('notUnique');
                    } else {
                        req.session.signUp = {
                            username,
                            password,
                        };
                        res.redirect('signIn/enterStatement');
                    }
                });
            });
        } else {
            pool((err, connection) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                connection.query(
                    'SELECT statement, id FROM users WHERE username=? AND password=?',
                    [username, password],
                    (err, result) => {
                        connection.release();
                        if (result.length) {
                            require('../createUser')(
                                req.session,
                                username,
                                password,
                                result[0].statement,
                                result[0].id,
                            );
                            res.render('user', { username, statement: req.session.user.statement });
                        } else {
                            res.render('notFound');
                        }
                    },
                );
            });
        }
    });

router
    .route('/enterStatement')
    .get((req, res) => {
        if (req.session.signUp || req.session.user) {
            res.render('enterStatement', { isFirst: req.session.isFirst });
        } else {
            res.redirect('/');
        }
    })
    .post((req, res) => {
        pool((err, connection) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            const signUp = { ...req.session.signUp };
            connection.query(
                `INSERT INTO users(username, password, statement) 
            VALUES(?, ?, ?)`,
                [signUp.username, signUp.password, req.body.statement],
                (err, result) => {
                    connection.release();

                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    require('../createUser')(
                        req.session,
                        signUp.username,
                        signUp.password,
                        req.body.statement,
                        result.insertId,
                    );
                    res.redirect(`/users/${signUp.username}`);
                },
            );
        });
    });
module.exports = router;
