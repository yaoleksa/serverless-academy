const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const arr = [];
let exception = false;

const askInput = () => {
  readline.question('Hello! Enter 10 words or digits deviding them in spaces: ', input => {
    const convertedToArray = input.split(' ');
    if(convertedToArray.length != 10) {
      exception = true;
      throw new Error('You must input exactly 10 words or digits');
    } else {
      arr.push(...convertedToArray);
    }
    readline.question(`How would you like to sort values:
      1. Sort words alphabetically
      2. Show numbers from lesser to greater
      3. Show numbers from bigger to smaller
      4. Display words in ascending order by number of letters in the word
      5. Show only unique words
      6. Display only unique values from the set of words and numbers entered by the user
      7. To exit the program, the user need to enter exit, otherwise the program will repeat itself again and again, asking for new data and suggesting sorting`, sortType => {
        if(sortType == 'exit') {
          readline.close();
          return;
        }
        askInput();
      });
  });
}


askInput();