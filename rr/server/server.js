const express = require('express');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const Users = require('./Models/user')

app.use(cors());

async function start() {
    try {
        const settingConnect = url;
        await mongoose.connect(settingConnect, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
 
        app.listen(PORT, () => {
            console.log('Server has been started port: ' + PORT)
        })
    } catch(e) {
        console.log(e)
    }
}
 
start()

Users.create({
    username: "Alex",
    email: "exaple@exaple.com",
    password: "1234" 
});

const mysql = require('mysql2');
const { DB_CONNECTION } = require('./const');

const connection = mysql.createConnection({
    host: DB_CONNECTION.host,
    port: DB_CONNECTION.port,
    user: DB_CONNECTION.username,
    password: DB_CONNECTION.password,
    database: DB_CONNECTION.database
})


connection.connect((err) => {
    if (!err) {
        console.log('success');
    } else {
        console.log('err:', err);
    }
});

app.get('/task', (req, res) => {
    connection.query('SELECT * FROM task;',
        (err, data) => {
            if (err) return res.status(500);
            res.json(data);
        })
});

app.get('/task/:id', (req, res) => {
    connection.query(`SELECT * FROM task WHERE id = ${req.params.id};`,
        (err, data) => {
            if (err) return res.status(500);
            res.json(data);
        })
});

app.get('/addTask', (req, res) => {
    fs.readFile('./sqlTasks.json', 'utf8', (err, data) => {
        if (!err) {
            const tasksArr = JSON.parse(data);
            tasksArr.map((task) => {
                const { description, due, employee, finished } = task;
                if (!employee || !description) return (console.error('ошибка'))
                const finishedText = finished ? `'${finished}'` : null;
                const dueText = due ? `'${due}'` : null;
                connection.query(`
                INSERT INTO task (Task_description, Due_date, Employee, Finished_date)
                VALUES ('${description}', ${dueText}, '${employee}', ${finishedText});`,
                    (err, data) => {
                        if (err) return (console.log('errErr', err));
                        // res.json(data);
                    })
            })
        } else {
            console.error('ошиииибкаааааа', err);
        }
    });
});



app.get('/updateTask', (req, res) => {
    connection.query(`
    UPDATE task
    SET Employee = 'Johny'
    WHERE Employee = 'John'; `, (err, data) => {
        if (!err) {
            console.log('изменил имя',data);
        } else {
            console.log(err);
        }
    });
    connection.query(`
      UPDATE task
      SET Finished_date = '2033-09-30'
      WHERE Finished_date IS NULL; `, (err, data) => {
        if (!err) {
            console.log('изменил дату ',data);
        } else {
            console.log(err);
        }
    });

//     connection.query(`
//     DELETE FROM task
//     WHERE Due_date IS NULL `, (err, data) => {
//     if (!err) {
//         console.log('удалил',data);
//     } else {
//         console.log(err);
//     }
// });
});


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


//!!!добавляет пользователя!!!
app.post('/user', function (request, response) {
    const users = [];
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            console.log('ошибка', err);
        }

        const usersArr = JSON.parse(data);
        console.log('usersArr', usersArr)
        const newIdTwo = usersArr.length + 1 //запись нового id новому пользователю
        console.log(newIdTwo);
        users.push(...usersArr);
        const newUser = request.body;
        for (let i = 0; i < usersArr.length; i++) {// проверка существует ли пользователь
            if ((users[i].login === newUser.login) ||
                (users[i].mail === newUser.mail) ||
                (users[i].id === newUser.id)) {
                console.log('пользователь существует');
                response.sendStatus(404)
                return
            }
        }
        newUser.id = newIdTwo; //запись нового id новому пользователю
        users.push(newUser);
        fs.writeFile('./users.json', JSON.stringify(users), (err, data) => {
            if (err)
                console.error(err)
        });
        response.json(users);
        console.log('записано', newUser);
    });
});

//!!!Меняет данные пользователя!!!
app.put("/user/:id", function (req, res) {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            console.log('ошибка', err);
        }
        const usersArr = JSON.parse(data);
        const idOfUser = parseInt(req.body.id);
        console.log('idOfUser', idOfUser)
        const userIdx = +usersArr.findIndex((user) => user.id === idOfUser);
        console.log('userIdx', userIdx);
        if (userIdx !== -1) {
            const oldUser = usersArr[userIdx];
            console.log('oldUser', oldUser)
            console.log('qqqqq', req.body);
            req.body.id = idOfUser;
            usersArr[userIdx] = { ...oldUser, ...req.body };
            fs.writeFile('./users.json', JSON.stringify(usersArr), (err, data) => {
                if (err)
                    console.error(err)
            });
            res.json(usersArr[userIdx]);
        } else {
            res.status(404).json();
        }
    });
});


//!!!Удаление пользователя!!!
app.delete('/user/:id', function (req, res) {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            console.log('ошибка', err);
        }
        const usersArr = JSON.parse(data);
        const idOfUser = parseInt(req.params.id);
        newUsers = usersArr.filter((user) => user.id !== idOfUser);
        fs.writeFile('./users.json', JSON.stringify(newUsers), (err, data) => {
            if (err)
                console.error(err)
        });
        res.json(newUsers);
    });
});