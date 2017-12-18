'use strict';
const nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
const config = require('../notes-app-client/src/config')
const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-2'});

var transporter = nodemailer.createTransport(ses({
    accessKeyId: config.aws_public_key,
    secretAccessKey: config.aws_secret_key
}));

async function sendMail(toAddr, subject, content, attachments = []) {
    transporter.sendMail({
        from: 'antoine.mctaggart@gmail.com',
        to: toAddr,
        subject: subject,
        text: content,
        attachments: attachments
    });
}

module.exports = {sendMail}