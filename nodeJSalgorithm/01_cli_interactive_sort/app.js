const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const allWords = (list) => {
  let result = true;
  list.forEach(e => {
    if(!Number.isNaN(Number(e))) {
      result = false;
    }
  });
  return result;
}

const allNumbers = (list) => {
  let result = true;
  list.forEach(e => {
    if(Number.isNaN(Number(e))) {
      result = false;
    }
  });
  return result;
}

const askInput = () => {
  let arr = [];
  readline.question('Hello! Enter 10 words or digits deviding them in spaces: ', input => {
    const convertedToArray = input.trim().split(' ');
    arr.push(...convertedToArray);
    readline.question(`How would you like to sort values:
      1. Sort words alphabetically
      2. Show numbers from lesser to greater
      3. Show numbers from bigger to smaller
      4. Display words in ascending order by number of letters in the word
      5. Show only unique words
      6. Display only unique values from the set of words and numbers entered by the user
      To exit the program, the user need to enter exit, otherwise the program will repeat itself again and again, asking for new data and suggesting sorting   `, sortType => {
        const trimmed = sortType.trim();
        switch(trimmed) {
          case '1':
            if(allWords(arr)) {
              console.log(arr.sort((first, second) => {
                return first.toLowerCase().localeCompare(second.toLowerCase());
              }));
            } else {
              console.log('For this type of sorting your must contain only words');
              askInput();
            }
            break;
          case '2':
            if(allNumbers(arr)) {
              arr.sort((a, b) => {
                if(a < b) {
                  return -1;
                } else if(a > b) {
                  return 1;
                }
                return 0;
              });
              console.log(arr);
            } else {
              console.log('For this type of sorting your must contain only numbers');
              askInput();
            }
            break;
          case '3':
            if(allNumbers(arr)) {
              arr.sort((a, b) => {
                if(a < b) {
                  return 1;
                } else if(a > b) {
                  return -1;
                }
                return 0;
              });
              console.log(arr);
            } else {
              console.log('For this type of sorting your must contain only numbers');
              askInput();
            }
            break;
          case '4':
            if(allWords(arr)) {
              arr.sort((a, b) => {
                if(a.length < b.length) {
                  return -1;
                } else if(a.length > b.length) {
                  return 1;
                }
                return 0;
              });
              console.log(arr);
            } else {
              console.log('For this type of sorting your must contain only words');
              askInput();
            }
            break;
          case '5':
            if(allWords(arr)) {
              const unique = new Set();
              arr.forEach(e => {
                unique.add(e);
              });
              console.log(unique);
            } else {
              console.log('For this type of sorting your must contain only words');
              askInput();
            }
            break;
          case '6':
            const unique = new Set();
            arr.forEach(e => {
              unique.add(e);
            });
            console.log(unique);
            break;
          case 'exit':
            readline.close();
            return;
        }
        askInput();
      });
  });
}


askInput();