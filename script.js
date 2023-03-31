//initialize variables
const display = document.querySelectorAll(".letter-box");
const ANSWER_LENGTH = 5
const WORD_URL = 'https://words.dev-apis.com/word-of-the-day'
const VAL_URL = 'https://words.dev-apis.com/validate-word'

//initialize function
const init = async(WORD_URL) => {
  let letters = '';
  let row = 0
  //const promise = await fetch('https://words.dev-apis.com/word-of-the-day');
  //const processedResponse = await promise.json();
  //let wordOfDay = processedResponse['word'].toUpperCase()
  let wordOfDay = 'SMITE'
  console.log(wordOfDay)
  var unusedLetters = wordOfDay
  var valStatus = false
  //enter answer function
  const commit = async(answer) => {
    //gather word validation status through API
    try {
      const response = await fetch(VAL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            word: letters,
          })
        });
        let data = await response.json();
        // logic when the fetch is successful
        valStatus = data['validWord']
      } catch(error) {
        // logic for when there is an error
        console.log(error)
        }

    if (answer.length < 5) {
      alert('not enough letters in guess')
    }
    else if (answer.length === 5 && valStatus === true) {
      checkLetters(answer)
      row += 1
      letters = ''
    }
    else if (answer.length === 5 && valStatus === false) {
      alert('Not a word, try again')
      letters = ''
      for (i=0; i<ANSWER_LENGTH; i++) {
        display[i+row*ANSWER_LENGTH].innerText = ''
      }
    }
  }

  //track event handling
  document.addEventListener('keydown', function() {
    if (isLetter(event.key)) {
      if (letters.length < ANSWER_LENGTH) {
        letters += event.key.toUpperCase()
      }
      else {
        letters = letters.slice(0, -1) + event.key.toUpperCase()
      }
    
    }
    else if (event.key === 'Backspace') {
      letters = letters.slice(0,-1)
      display[letters.length+row*ANSWER_LENGTH].innerText = ''
      console.log(letters)
    }
    else if (event.key === 'Enter') {
      unusedLetters = wordOfDay
      commit(letters)
      letters = ''
    }
    reRender(letters, row)
  })

  //check correct letters
  const checkLetters = (letters) => {
    //loop through to find letters in correct spot
    for (i=0; i<letters.length; i++) {
      if (letters[i] === wordOfDay[i] && trackLetters(letters[i])) {
        display[i+row*ANSWER_LENGTH].className += ' correct'
      }
    }
    //loop through to check if letter present but in wrong spot
    for (i=0; i<letters.length; i++) { 
      if (wordOfDay.includes(letters[i]) && trackLetters(letters[i])) {
        display[i+row*ANSWER_LENGTH].className += ' wrong-spot'
      }
    }
    checkWord(letters)
  }

  //check if full word is correct
  const checkWord = (letters) => {
    if (letters === wordOfDay) {
      alert('you won')
    }
  }

  //track the quantity of letters for wrong-spot designator
  const trackLetters = (letter) => {
    if (unusedLetters.includes(letter)) {
      unusedLetters = unusedLetters.replace(letter, '')
      return true
    }
    else {
      return false
    }
  }

  //validate entered word is actual word with api call
  const validateWord = async(letters) => {
    try {
      const response = await fetch(VAL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            word: letters,
          })
        });
        let data = await response.json();
        // enter you logic when the fetch is successful
        return data['validWord']
      } catch(error) {
      // enter your logic for when there is an error (ex. error toast)
        console.log(error)
        }
  }
}

//check if letter function
const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
}

//re-render letters in display
const reRender = (letters, row) => {
    for (let i=0; i<letters.length; i++) {
      display[i+row*ANSWER_LENGTH].innerText = letters[i]
  }
}

init()
