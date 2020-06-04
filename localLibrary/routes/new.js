const express = require('express');
const router = express.Router();

let messages = [
    {
        message: 'Hi there',
        author: 'Amando',
        added: new Date()
    },
    {
        message: 'Hello World',
        author: 'Charles',
        added: new Date()
    },
]

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('form', {
        title: 'Mini Message Board',
        messages: messages
    });
});

router.post('/', function (req, res, next) {
    const { author, message } = req.body;
    const added = new Date();
    messages.push({
        author,
        message,
        added
    });
    res.redirect('/new')
});

module.exports = router;