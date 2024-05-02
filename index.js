const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
var db = [];

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/owner', (req, res) => {
res.sendFile(path.join(__dirname, '/owner.html'));
});

app.get('/messages', (req, res) => {
const messages = db;
res.json({status:200,messages:messages});
});

app.post('/messages', (req, res) => {
const { message } = req.body;
if (!message) {
return res.status(400).send('Message is required');
};
db.push(message);
res.redirect('/');
});

app.post('/send', (req, res) => {
const { number, message } = req.body;
if (!message) return res.status(400).send('Message is required');
let mk =`> Satzz.sendMessage('${number}@s.whatsapp.net', {text: '${message}'})`
db.push(mk);
res.redirect('/');
});

app.get('/delete/messages', (req, res) => {
db = []
res.redirect('/');
});


app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
