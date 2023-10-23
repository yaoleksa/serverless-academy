import fs, { mkdirSync } from "fs";
import inquirer from "inquirer";

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
                dbMap.set(element.NameOfTheUser, element);
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
    when: (response) => {
        if(response && response.searchInDB) {
            return true;
        }
        return false;
    }
});

const askInput = () => {
    inquirer.prompt([userName, userGender, userAge, search, findByName]).then(answer => {
        const objMap = new Map();
        if(answer && answer.NameOfTheUser && answer.NameOfTheUser.length > 0) {
            fs.appendFile('./db.txt', JSON.stringify(answer) + '\n', err => {
                if(err) {
                    console.error(err.message);
                }
            });
            console.log('User was successfully created into database');
        }
        if(answer && answer.findByName && answer.findByName.length > 0) {
            const query = dbMap.get(answer.findByName);
            if(query) {
                console.log(`User was succesfuly found.\n ${JSON.stringify(query)}`);
            } else {
                console.log('Such user does not exist. Try Again');
            }
        }
        askInput();
    });
}

askInput();