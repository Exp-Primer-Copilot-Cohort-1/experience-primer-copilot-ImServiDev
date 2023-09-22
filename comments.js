// Create web server
// 1. load module
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var template = require('./lib/template.js');
var db = require('./lib/db.js');
var sanitizeHTML = require('sanitize-html');
var qs = require('querystring');
var path = require('path');
var fs = require('fs');
var cookie = require('cookie');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');
var db = require('./lib/db');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
// 2. create server object
// var app = http.createServer(function(request, response) {
//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;
//     var pathname = url.parse(_url, true).pathname;
//     if (pathname === '/') {
//         if (queryData.id === undefined) {
//             db.query(`SELECT * FROM topic`, function(error, topics) {
//                 var title = 'Welcome';
//                 var description = 'Hello, Node.js';
//                 var list = template.list(topics);
//                 var html = template.HTML(title, list,
//                     `<h2>${title}</h2>${description}`,
//                     `<a href="/create">create</a>`
//                 );
//                 response.writeHead(200);
//                 response.end(html);
//             });
//         } else {
//             db.query(`SELECT * FROM topic`, function(error, topics) {
//                 if (error) {
//                     throw error;
//                 }
//                 db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`, [queryData.id], function(error2, topic) {
//                     if (error2) {
//                         throw error2;
//                     }
//                     var title = topic[0].title;
//                     var description = topic[0].description;
//                     var