'use strict';
const express = require('express');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const request = require('request');
const handlebars = require('express-handlebars');
const admin = require('./auth.js');
const config = require('./config.js');

const app = express();

const auth = [];
const page = [];
const dialog = [];

const hbs = handlebars.create({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(cors());

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8086;

const db = config.database;
const ConnPool = require('./conn_pool.js');
const connPool = new ConnPool();
const conn = connPool.conn;

hbs.handlebars.registerHelper('sanitizeContent', function (currentValue) {
    return (currentValue == '1' || currentValue == 'true') ? "checked" : "";
});

hbs.handlebars.registerHelper('isChecked', function (currentValue) {
    return (currentValue == '1' || currentValue == 'true') ? "checked" : "";
});

hbs.handlebars.registerHelper('isActiveORVisibleIcon', function (currentValue) {
    return new hbs.handlebars.SafeString((currentValue == '1' || currentValue == 'true') ? "&#x2705;" : "&#x274C;");
});

conn.connect((err) => {
    console.log("Connecting to MYSQL database...");
    if (err) {
        console.log("Connection failed! " + JSON.stringify(err, null, 1));
        return;
    }
    console.log("MYSQL connection successful...");
    app.listen(port, () => {
        auth['user'] = 'admin';
        auth['pass'] = admin.admin;
        console.log("Server listening on port: ", port);
        console.log("Authentication: ", auth);
    });
});

app.use(basicAuth({
    users: admin,
    challenge: true
}));

app.get('/', (req, res) => {
    page['title'] = "Home";
    dialog['message'] = "";
    res.render('home', { page: page, dialog: dialog });
});