//initialize variables
const display = document.querySelectorAll(".letter-box");
const ANSWERLENGTH = 5
const WORDURL = 'https://words.dev-apis.com/word-of-the-day'

//initialize function
const init = async(WORDURL) => {
  let letters = '';
  let row = 0
  //const promise = await fetch('https://words.dev-apis.com/word-of-the-day');
  //const processedResponse = await promise.json();
  //let wordOfDay = processedResponse['word'].toUpperCase()
  let wordOfDay = 'SMITE'
  console.log(wordOfDay)
  var unusedLetters = wordOfDay
  //enter answer function
  const commit = (answer) => {
    if (answer.length < 5) {
      alert('not enough letters in guess')
    }
    else if (answer.length === 5) {
      checkLetters(letters)
      row += 1
      letters = ''
    }
  }

  //track event handling
  document.addEventListener('keydown', function() {
    if (isLetter(event.key)) {
      if (letters.length < ANSWERLENGTH) {
        letters += event.key.toUpperCase()
      }
      else {
        letters = letters.slice(0, -1) + event.key.toUpperCase()
      }
    
    }
    else if (event.key === 'Backspace') {
      letters = letters.slice(0,-1)
      display[letters.length+row*ANSWERLENGTH].innerText = ''
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
        display[i+row*ANSWERLENGTH].className += ' correct'
      }
    }
    //loop through to check if letter present but in wrong spot
    for (i=0; i<letters.length; i++) { 
      if (wordOfDay.includes(letters[i]) && trackLetters(letters[i])) {
        display[i+row*ANSWERLENGTH].className += ' wrong-spot'
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
}

//check if letter function
const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
}


//re-render letters in display
const reRender = (letters, row) => {
    for (let i=0; i<letters.length; i++) {
      display[i+row*ANSWERLENGTH].innerText = letters[i]
  }
}

init()
