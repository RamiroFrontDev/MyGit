
// VARIABLES

const boxClick = document.querySelector('.tateti-row');
const boxChilds = boxClick.children;
const boxMessage = document.querySelector('.boxMessage');
const cleanButton = document.querySelector('.clean');
let counter = 0;
let valueAssign;
let player1 = [];
let player2 = [];
let isWinner = false;


// FUNCTIONS

ctaElemTarget();

function clickedElem(elem){

    let valueId = parseInt(elem.target.id);
    counter++;
    let pair = counter % 2;
    valueAssign = false;

    // Player info
    if( pair === 0 ){
        valueAssign = 'X';
        player1.push( valueId );
    } else {
        valueAssign = 'O';
        player2.push( valueId );
    }

    elem.target.textContent = valueAssign;
    elem.target.setAttribute('class', 'not-click');

    combiners(elem);
 
};

//The combiner
function combiners() {
    let playerChoose;
    let winnerPlayerArray;
    let repeat;
    let combinerWin;

    valueAssign === 'X' ? playerChoose = player1 : playerChoose = player2;

    winnerPlayerArray = playerChoose;
    let possibleCombiners = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [3,5,7],
        [1,5,9]
    ];

    for (let j = 0; j < possibleCombiners.length; j++) {
        repeat = 0;
        let combinerObj = possibleCombiners[j];

        for (let k = 0; k < combinerObj.length; k++) {

            for (let i = 0; i < winnerPlayerArray.length && !isWinner; i++) {
                if( winnerPlayerArray[i] === combinerObj[k] ) {
                    repeat++;
                    if( repeat === 3 ){
                        combinerWin = combinerObj;
                        isWinner = true;
                    }
                }
            };

        }
    };

    if(isWinner && valueAssign === 'X'){
        messagesResult(isWinner, combinerWin);
    } else if(isWinner && valueAssign === 'O') {
        messagesResult(isWinner, combinerWin);
    } else if (counter === 9){
        messagesResult();
    }
};

// Messages Information
function messagesResult (x, y) {
    x ? boxMessage.textContent = `The winner is ${valueAssign}` : boxMessage.textContent = 'Draw';
    boxClick.classList.add('not-click');
    ctaCleanData();

    for (let a = 0; a < y.length; a++){
        for(let b = 0; b < boxChilds.length; b++){
            if( y[a] === parseInt(boxChilds[b].id) ) {
                let spanBackColor = boxChilds[b];
                spanBackColor.setAttribute('class', 'colorWin');
            }
            
        }
    }

}

// Buttons
function cleanBodyData () {
    for( i = 0; i < boxChilds.length; i++){
        boxChilds[i].removeAttribute('class');
        boxChilds[i].innerHTML = '';
    }
    boxMessage.innerHTML = '';
    boxClick.classList.remove('not-click');
    boxClick.classList.toggle('rotate');
    cleanButton.setAttribute('hidden', 'hidden');
    counter = 0;
    valueAssign = false;
    isWinner = false;
    player1 = [];
    player2 = [];
};

// EVENTS

// Clean button
function ctaCleanData () { 
    console.log('entro')
    cleanButton.removeAttribute('hidden');
    cleanButton.addEventListener('click', cleanBodyData);
}

// Element on click
function ctaElemTarget (){
    for( i = 0; i <= boxChilds.length -1; i++ ) {
        boxChilds[i].addEventListener('click', clickedElem);
    }
}
