const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const arr = [];

const askInput = () => {
  readline.question('Hello! Enter 10 words or digits deviding them in spaces: ', input => {
    const convertedToArray = input.split(' ');
    if(convertedToArray.length != 10) {
      console.log('You must enter exactly ten words or numbers');
      askInput();
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
      To exit the program, the user need to enter exit, otherwise the program will repeat itself again and again, asking for new data and suggesting sorting`, sortType => {
        const trimmed = sortType.trim();
        switch(trimmed) {
          case '1':
            readline.close();
            console.log(arr.sort());
            return;
          case '2':
            return checkType(arr);
          case '3':
            return checkType(arr);
          case '4':
            return checkType(arr);
          case '5':
            return checkType(arr);
          case '6':
            return checkType(arr);
          case 'exit':
            readline.close();
            return;
        }
        askInput();
      });
  });
}


askInput();