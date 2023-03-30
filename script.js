//initialize variables
const display = document.querySelectorAll(".letter-box");
const ANSWERLENGTH = 5
let letters = '';
let row = 1

//initialize event handling
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
    display[letters.length].innerText = ''
    console.log(letters)
  }
  else if (event.key === 'Enter') {
    console.log('enter')
    commit(letters)
    letters = ''
  }
  reRender()
})

//check if letter function
const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
}

//enter answer function
const commit = (answer) => {
  if (answer.length < 5) {
    alert('not enough letters in guess')
  }
  else if (answer.length === 5) {
    alert('guess')
    row += 1
    letters = ''
  }
}

//re-render letters in display
const reRender = () => {
  for (let j=0; j<row.length; j++)
    for (let i=0; i<letters.length; i++) {
      display[i+j*ANSWERLENGTH].innerText = letters[i]
  }
}
