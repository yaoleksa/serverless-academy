import inquirer from "inquirer";

class Question {
    name;
    constructor(params) {
        this.name = params.name;
    }
}

const userName = new Question({"name": "Enter user\'s name. To cancel press ENTER: "});

inquirer.prompt([userName]).then(answer => {
    console.log(answer);
})