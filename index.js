const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, './index.html'));
});
app.get('/messages', (req, res) => {
const messages = JSON.parse(fs.readFileSync('./messages.json'));
res.json({status:200,messages:messages});
});

app.post('/messages', (req, res) => {
const { message } = req.body;
if (!message) {
return res.status(400).send('Message is required');
}
const messages = JSON.parse(fs.readFileSync('./messages.json'));
messages.push(message);
fs.writeFileSync('./messages.json', JSON.stringify(messages, null, 2));
res.redirect('/');
});

app.get('/delete/messages', (req, res) => {
fs.writeFileSync('./messages.json', '[]');
res.json({ status: 200, message: 'All messages deleted successfully' });
});


app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
