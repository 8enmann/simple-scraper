'use strict';

var os = require('os');
var nodeStatic = require('node-static');
var http = require('http');
var fetch = require('node-fetch');

const TARGET = 'https://app.rockgympro.com/b/widget/?a=offering&offering_guid=7f5cd8dcc8754f8d8762e8ccb098580e&widget_guid=d93a5cfb1e234b6aae1d03a45c77b594&random=5852df5027c77&iframeid=rgpiframe5852df4fbb03f&mode=e';
/* var file = new nodeStatic.Server('./public');
var app = http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(process.env.PORT || 8080);
*/

var api_key = 'key-eea59324f0d0124ad09c4ebc21d97dc0';
var domain = 'sandbox6cbaff98a0cd480fbecac8637f47f695.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
console.log('hello');
fetch(TARGET)
    .then(function(res) {
        return res.text();
    }).then(function(body) {
      let noClass = body.includes('Sorry, but no dates are currently scheduled');
      console.log(noClass);
 
      var data = {
        from: 'Cliff Scraper <postmaster@sandbox6cbaff98a0cd480fbecac8637f47f695.mailgun.org>',
        to: '8enmann@gmail.com',
        subject: `Cliff Scraper: ${noClass}`,
        text: body,
      };
 
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
    });
