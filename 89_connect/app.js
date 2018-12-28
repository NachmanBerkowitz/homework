const app = require('connect')();
const hfs = require('./htmlFileServer');

app.use((req, res,next) => {
    res.setHeader('Content-Type', 'text/html');
    hfs('nav.html').pipe(res);
    next();
});

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    next();
});

app.use('/home', (req, res) => {
    hfs('home.html').pipe(res);
});

app.use('/about', (req, res) => {
    hfs('about.html').pipe(res);
});

app.use(require('./queryParser'));

app.use('/admin', (req, res, next) => {
    if (!req.query.magicWord || req.query.magicWord !== 'please') {
        hfs('blocked.html').pipe(res);
    } else {
        next();
    }
});
app.use('/admin', (req, res) => {
    hfs('..\\admin.html').pipe(res);
});

app.use((req, res) => {
    res.statusCode = 404;
    res.next('err');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
    hfs('error.html').pipe(res);
});

app.listen(80);
