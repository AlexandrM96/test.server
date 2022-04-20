let name = 'alexandrM';
console.log(name);
const fs = require('fs');

fs.readFile('./names.json', 'utf8', (err, data) => {
    if (!err) {
        const users = JSON.parse(data);
        console.log(users);
        let as = 0;
        for (let i = 0; i < users.length; i++) {
            console.log('as', users[i].age);
            as += users[i].age;
        }
        as = as / users.length;
        console.log(as.toFixed(0));
        fs.writeFile('result.txt', as.toString(), (err) => {
            if (err) {
              console.error(err)
              return
            }
            console.log('записано');
          })
        // let simplerAverageAge = 0;
		// for (let i = 0; i < users.length; i++) {
		// 	simplerAverageAge += users[i].age;
		// }
		// simplerAverageAge = simplerAverageAge / users.length;
		// console.log(simplerAverageAge);

		// let forEachAge = 0;
		// users.forEach(user => forEachAge += user.age);
		// forEachAge /= users.length;
		// console.log(forEachAge);

		// let simpleAverageAge = 0;
		// users.map((user) => {
		// 	simpleAverageAge += user.age;
		// });
		// simpleAverageAge /= users.length;
		// console.log(simpleAverageAge);

    } else {
        console.error(err);
    }
});