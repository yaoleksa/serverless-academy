import fs from "fs";
import inquirer from "inquirer";

const usersInCurrentSession = new Map();
let createMode = true;
let searchMode = false;

class Question {
    name;
    type;
    message;
    choices;
    when;
    constructor(params) {
        this.name = params.name;
        this.type = params.type;
        this.message = params.message;
        this.choices = params.choices;
        this.when = params.when;
    }
}

const userName = new Question({
    name: "NameOfTheUser", 
    type: "input",
    message: "Enter user\'s name. To cancel press ENTER: ",
    when: true
});

const userGender = new Question({
    name: "GenderOfTheUser",
    type: "list",
    message: "Choose your gender: ",
    choices: ['Male', 'Female'],
    when: (response) => {
        if(response && response.NameOfTheUser && response.NameOfTheUser.length > 0) {
            return true;
        }
        return false;
    }
});

const userAge = new Question({
    name: "AgeOfTheUser",
    type: "number",
    message: "Enter your age: ",
    when: (response) => {
        if(response && response.NameOfTheUser && response.NameOfTheUser.length > 0) {
            return true;
        }
        return false;
    }
});

const search = new Question({
    name: "searchInDB",
    type: "confirm",
    message: "Would you to search values in DB? ",
    when: (response) => {
        if(response && response.NameOfTheUser == '') {
            return true;
        }
        return false;
    }
});

const dbMap = new Map();
let msgPrefix = "";

fs.readFile('./db.txt', 'utf-8', (err, data) => {
    if(err) {
        console.error(err.message);
        return;
    } else if (data) {
        data.split('\n').forEach(e => {
            let element;
            try {
                element = JSON.parse(e);
                msgPrefix += JSON.stringify(element);
                dbMap.set(element.NameOfTheUser.toLowerCase(), element);
            } catch(err) {
                // error was successfuly caught;
            }
        });
    }
});

const findByName = new Question({
    name: "findByName",
    type: "input",
    message: "Enter user name you wanna find in DB: ",
    when: true
});

const askInput = () => {
    inquirer.prompt([userName, userGender, userAge, search]).then(answer => {
        const objMap = new Map();
        if(answer && answer.NameOfTheUser && answer.NameOfTheUser.length > 0) {
            const Id = answer.NameOfTheUser.toLowerCase();
            if(!dbMap.has(Id) && !usersInCurrentSession.has(Id)) {
                fs.appendFile('./db.txt', JSON.stringify(answer) + '\n', err => {
                    if(err) {
                        console.error(err.message);
                    }
                });
                usersInCurrentSession.set(Id, answer);
                dbMap.set(Id, answer);
                console.log('User was successfully created into database');
            } else {
                console.log('User with this name already exist! Duplicates don\'t allowed!');
            }
        }
        if(answer && answer.searchInDB) {
            searchMode = true;
            createMode = false;
            if(dbMap.size > 0) {
                dbMap.forEach(e => {
                    console.log(e);
                });
            } else {
                usersInCurrentSession.forEach(e => {
                    console.log(e);
                })
            }
        }
        if(answer && answer.searchInDB === false) {
            process.exit();
        }
        if(createMode) {
            askInput();
        } else if(searchMode) {
            inquirer.prompt([findByName]).then(userResponse => {
                if(userResponse && userResponse.findByName && userResponse.findByName.length > 0) {
                    let key = userResponse.findByName.toLowerCase();
                    let query = dbMap.get(key);
                    if(!query) {
                        query = usersInCurrentSession.get(key);
                    }
                    if(query) {
                        console.log(`User was succesfuly found.\n ${JSON.stringify(query)}`);
                    } else {
                        console.log('Such user does not exist. Try Again');
                    }
                }
            })
        }
    });
}

askInput();