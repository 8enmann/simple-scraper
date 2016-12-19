'use strict';

var fetch = require('node-fetch');
var mailcomposer = require("mailcomposer");

const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
console.log('hello');
fetch(process.env.TARGET_URL)
    .then(function(res) {
        return res.text();
    }).then(function(body) {
      let noClass = body.includes(process.env.TARGET_STRING);
      console.log(noClass);
      let to = '8enmann@gmail.com';
      var mail = mailcomposer({
        from: 'Cliff Scraper <postmaster@sandbox6cbaff98a0cd480fbecac8637f47f695.mailgun.org>',
        to: to,
        subject: `Cliff Scraper: ${noClass}`,
        html: body,
      });
      mail.build(function(mailBuildError, message) {
        
        var dataToSend = {
          to: to,
          message: message.toString('ascii')
        };
        mailgun.messages().sendMime(dataToSend, function (sendError, body) {
          if (sendError) {
            console.log(sendError);
            return;
          }
          console.log(body);
        });
      });
    });
