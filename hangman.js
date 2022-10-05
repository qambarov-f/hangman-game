const word_El = document.getElementById('word');
const popup = document.getElementById('popup-container');
const redPopup = document.querySelector('.popup');
const message_el = document.getElementById('sucsses-mesage');
let wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgain = document.getElementById('play-again');

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord () {
    const words = ["css", "javascript", "phyton","php", "html", "java",];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord () {

    word_El.innerHTML = `
    ${selectedWord.split('').map(letter => `
        <div class="letter">
        ${correctLetters.includes(letter) ? letter: ''}
        </div>
    `).join('')}
    `

    const w = word_El.innerText.replace(/\n/g, '');
    if(w === selectedWord){
        popup.style.display = 'flex';
        message_el.innerText = 'Congrulats! You Won!'
    }
}

function updateWrongLetters(){
    wrongLetters_el.innerHTML = `
    ${wrongLetters.length>0?'<h3>Wrong Letters:</h3>':''}
    ${wrongLetters.map(letter=> `<span>${letter}<span>`)} 
    `;

    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;
        
        if(index<errorCount){
            item.style.display = 'block'
        } else {
            item.style.display = 'none'
        }
    })

    if(wrongLetters.length === items.length){
        popup.style.display = 'flex';
        message_el.innerText = 'Opps.You died!'
        redPopup.style.backgroundColor = 'red'

    }
}

function displayMesage(){
    message.classList.add('show');

    setTimeout(function(){
        message.classList.remove('show');
    }, 2000)
}

playAgain/addEventListener('click',()=>{
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    selectedWord = getRandomWord();
    
    displayWord();
    updateWrongLetters();

    popup.style.display = 'none'
});

window.addEventListener('keydown', function(e){
 if(e.keyCode >= 65 && e.keyCode <= 95){
    const letter = e.key;

    if(selectedWord.includes(letter)) {
        if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
        } else {
            displayMesage();
        }
    } else {
        if(!wrongLetters.includes(letter)){
            wrongLetters.push(letter);
            updateWrongLetters();
        } 
        else {
            displayMesage();     
        }
    }
 }
})
displayWord(); 