const express = require('express');
const app = express();
const cors = require('cors')
const config = require('./notes-app-client/src/config')
const axios = require('axios')
const sendMail =require('./libs/sendMail')
const AWS = require("aws-sdk");
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON ${PORT}`);
})

app.post('/', (req, res) => {
    let data = req.body
    console.log(data)

    sendMail.sendMail(data.toAddress, data.subject, data.content, data.attachments)
    // sendMail.sendMail('bboy01cheshire@gmail.com', data.subject, data.content)
    .catch(err => {
        console.log
    })
})