const fs = require('fs');
fs.readFile('./data.json', (err, data) => {
    if(err) {
        console.error(err.message);
    }
    if(data) {
        const convertedData = data.toString('utf-8');
        const beforeParsing = convertedData.slice(convertedData.indexOf('[') + 1, convertedData
        .lastIndexOf(']')).replace(/\},\r\n\s+\{/g, '}*\n{').split("*\n");
        const unique = new Map();
        let vacation;
        let user;
        beforeParsing.forEach(e => {
            vacation = JSON.parse(e);
            if(!unique.has(vacation.user._id)) {
                user = new User(vacation.user._id, vacation.user.name, vacation);
                unique.set(user.userId, user);
            } else {
                unique.get(vacation.user._id).vacations.push(vacation);
            }
        });
        console.log(unique.size);
    }
});

class User {
    userId;
    userName;
    vacations;
    constructor(user_id, user_name, vacation) {
        this.userId = user_id;
        this.userName = user_name;
        this.vacations = [vacation];
    }
}