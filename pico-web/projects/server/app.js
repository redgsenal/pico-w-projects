'use strict';
const express = require('express');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const request = require('request');
const handlebars = require('express-handlebars');
const admin = require('./auth.js');
//const config = require('./config.js');

const app = express();

const auth = [];
const page = [];
const dialog = [];
const status = [];

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

// disable db first
/* const db = config.database;
const ConnPool = require('./conn_pool.js');
const connPool = new ConnPool();
const conn = connPool.conn; */

hbs.handlebars.registerHelper('sanitizeContent', function (currentValue) {
    return (currentValue == '1' || currentValue == 'true') ? "checked" : "";
});

hbs.handlebars.registerHelper('isChecked', function (currentValue) {
    return (currentValue == '1' || currentValue == 'true') ? "checked" : "";
});

hbs.handlebars.registerHelper('isActiveORVisibleIcon', function (currentValue) {
    return new hbs.handlebars.SafeString((currentValue == '1' || currentValue == 'true') ? "&#x2705;" : "&#x274C;");
});

// disabled db first
/* conn.connect((err) => {
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
        page['site'] = 'Pico W Web App';
        status['led'] = 'off';
    });
}); */

app.listen(port, () => {
    auth['user'] = 'admin';
    auth['pass'] = admin.admin;
    console.log("Server listening on port: ", port);
    console.log("Authentication: ", auth);
    page['site'] = 'Pico W Web App';
    status['led'] = 'off';
    status['green'] = 'off';
    status['msg'] = '';
    status['success'] = false;
    console.log("Web Server ready...");
});

app.use(basicAuth({
    users: admin,
    challenge: true
}));

app.get('/', (req, res) => {
    page['title'] = 'Home';
    dialog['message'] = "";
    console.log(page);
    console.log(status);
    res.render('home', { page: page, dialog: dialog });
});

app.post('/LED', (req, res) => {
    let data = req.body;
    let led = data.led.toLowerCase();
    const result = { "led": led, "success": true };
    status['led'] = led;
    console.log('/POST');
    console.log('data', data);
    console.log(status);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
});

app.post('/green', (req, res) => {
    let data = req.body;
    let led = data.led.toLowerCase();
    const result = { "green": led, "success": true };
    status['green'] = led;
    console.log('/POST');
    console.log('data', data);
    console.log(status);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
});

app.get('/LED', (req, res) => {
    let led = status.led;
    const result = { "led": led, "success": true };
    console.log('/GET');
    console.log(status);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
});

app.post('/press', (req, res) => {
    let data = req.body;
    let led = data.status.toLowerCase();
    console.log("led ", led);
    status['led'] = led;
    const result = { "led": led, "success": true };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
});

app.post('/update', (req, res) => {
    let data = req.body;
    let led = status.led;
    let msg = data.msg.toLowerCase();
    console.log("msg ", msg);
    status['msg'] = msg;
    const result = { "led": led, "msg": msg, success: true };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
});

app.get('/status', (req, res) => {
    let result = { "led": status.led, "green": status.green, "msg": status.msg, "success": true };
    console.log('/GET');
    console.log(status);
    console.log(result);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
});