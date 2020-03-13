const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const Parser = require('rss-parser')
const cron = require('node-cron')

const db = require('diskdb')
db.connect('./data', ['emails'])

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/', (req, res) => {
    res.send("api online!")
})

app.post('/saveEmail', (req, expressRes) => {
    
    //add req to db
    let emailObj = req.body
    console.log('Adding new email: ', emailObj)

    db.contactRequests.save(emailObj)

    expressRes.send({
        success: true,
        message: 'sent email!',
        body: res
    })
})

app.get('/emailList', (req, res) => {
    console.log('getting contactRequests')

    res.json(db.contactRequests.find())
})

const PORT = 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))