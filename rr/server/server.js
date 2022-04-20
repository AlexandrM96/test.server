const express = require('express');
const fs = require('fs');
const cors = require('cors');
const e = require('express');
const app = express();

app.use(cors());

const cards = [
    { "card": "0000 0000 0000 0000", "id": 1 },
    { "card": "1111 1111 1111 1111", "id": 2 },
    { "card": "2222 2222 2222 2222", "id": 3 },
    { "card": "3333 3333 3333 3333", "id": 4 },
    { "card": "4444 4444 4444 4444", "id": 5 },
    { "card": "5555 5555 5555 5555", "id": 6 }
]

app.get('/', function (request, response) {
    response.send('Hello World!');
});

app.get('/card', function (request, response) {
    fs.readFile('./card.json', 'utf8', (err, data) => {
        if (!err) {
            const card = JSON.parse(data);
            const count = parseInt(request.query.count);
            const offset = parseInt(request.query.offset);
            console.log(card);
            console.log(data);
            response.send({ card: card.slice(offset, offset + count), count: card.length })//{ card: card.slice(offset, offset + count), count: card.length }
        } else {
            console.error(err);
        }
    });
});


app.get('/card/:id', function (req, res) {
    const card = cards.find(c => c.id.toString() === req.params.id);
    // res.send(card ? card : 'no data-');
    if (!card) {
        res.sendStatus(404).send();
    } else {
        res.send(card);
    }

    //   res.send(cards.find(card => card['id'].toString() === req.params.id));

});

//!!!домашнее задание(урок 2 Библиотека Express)!!!
app.get('/home', function (request, response) {
    fs.readFile('../names.json', 'utf8', (err, data) => {
        if (!err) {
            const users = JSON.parse(data);
            console.log(users);
            response.send(data)
        } else {
            console.error(err);
        }
    });
})
//!!!домашнее задание(урок 2 Библиотека Express) закончилось!!!

//!!!домашнее задание(урок 3 request, response)!!!
app.get('/electronics', function (request, response) {
    fs.readFile('./item.json', 'utf8', (err, data) => {
        if (!err) {
            const items = JSON.parse(data);
            const count = parseInt(request.query.count);
            const offset = parseInt(request.query.offset);
            if (request.url === '/electronics') {
                response.send(items);
            } else {
                response.send({ items: items.slice(offset, offset + count), count: items.length })
            }
        } else {
            res.sendStatus(404).send();
        }
    });
});

app.get('/electronics/:id', function (request, response) {
    fs.readFile('./item.json', 'utf8', (err, data) => {
        if (!err) {
            const items = JSON.parse(data);
            response.send(items.find(item => item['id'].toString() === request.params.id));
        } else {
            res.sendStatus(404).send();
        }
    });
});
//!!!домашнее задание(урок 3 request, response) закончилось!!!

app.get('/client', function (request, response) {
    response.send('Этот роут отвечает за клиентов');
});

app.get('/home', function (request, response) {
    fs.readFile('../names.json', 'utf8', (err, data) => {
        if (!err) {
            const users = JSON.parse(data);
            console.log(users);
            response.send(data)
        } else {
            console.error(err);
        }
    });
})

app.listen(4000, function () {
    console.log('Example app listening on port 4000!!!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [];

app.post('/user', function (request, response) {
    users.push(request.body);
    response.json(request.body);
});

app.get('/user', function (request, response) {
    response.json(users);
    response.send(users);
});