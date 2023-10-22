import fs from "fs";
import inquirer from "inquirer";

class Question {
    name;
    type;
    message;
    choices;
    validate = (inp) => {
        if(typeof inp == 'string' && inp.length == 0) {
            process.exit();
        }
        return true;
    }
    constructor(params) {
        this.name = params.name;
        this.type = params.type;
        this.message = params.message;
        this.choices = params.choices;
    }
}

const userName = new Question({
    name: "NameOfTheUser", 
    type: "input",
    message: "Enter user\'s name. To cancel press ENTER: ",
});

const userGender = new Question({
    name: "GenderOfTheUser",
    type: "list",
    message: "Choose your gender: ",
    choices: ['Male', 'Female'],
});

const userAge = new Question({
    name: "AgeOfTheUser",
    type: "number",
    message: "Enter your age: "
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