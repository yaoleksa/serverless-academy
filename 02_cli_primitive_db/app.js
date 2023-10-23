import fs from "fs";
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

const askInput = () => {
    inquirer.prompt([userName, userGender, userAge]).then(answer => {
        fs.appendFile('./db.txt', JSON.stringify(answer) + '\n', err => {
            if(err) {
                console.error(err.message);
            }
        });
        console.log('User was successfully created into database');
        askInput();
    });
}

askInput();