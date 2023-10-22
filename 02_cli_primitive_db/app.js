import inquirer from "inquirer";

class Question {
    name;
    type;
    message;
    choices;
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
    message: "Choose your gender. To cancel press ENTER: ",
    choices: ['Male', 'Female'],
});

const userAge = new Question({
    name: "AgeOfTheUser",
    type: "number",
    message: "Enter your age. To cancel press ENTER: "
});

inquirer.prompt([userName, userGender, userAge]).then(answer => {
    console.log(answer);
})