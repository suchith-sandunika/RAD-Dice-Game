// 1.
const playbutton = document.querySelector(".play-button");   // create these variables to link with the relevant parts in css file.
const resetbutton = document.querySelector(".reset-button");

const dice = document.querySelectorAll(".dice");

const player01 = document.querySelector('.Player01'); 
const player02 = document.querySelector('.Player02');

const player01score = document.querySelector('.Player01 p'); 
const player02score = document.querySelector('.Player02 p');

const winmassage01 = document.querySelector('.winmassage01')
const winmassage02 = document.querySelector('.winmassage02')

// 2.
const gameplay = // create the object gameplay and set player01,player02 objects.
{
    player01: 
    {
        turn: false, // this is used to describe about the turns and scores of the players.
        score: 0,
    },
    player02: 
    {
        turn: false,
        score: 0,
    },
};

// 3.
function getarandomdicevalue() 
{
  return Math.floor(Math.random() * 6) + 1;   // to create a random number between 1 and 6. floor is used to get a full number insted of floats.
}


function getnumber(number) 
{
    if(number<10) 
    {
        return `00${number}`;// to return a number with 00 in front
    } 
    else if (number<100) 
    {
        return `0${number}`;// to return a number with 0 in front
    } 
    else 
    {
        return `${number}`// to return the number set as score. 
    }
}

// 4.
playbutton.addEventListener("click", () => 
{
    const dicevalue01 = getarandomdicevalue(); // set the values (1 to 6)
    const dicevalue02 = getarandomdicevalue();

    const player = gameplay.player01.turn ? "player01" : "player02";
    //console.log(player);

    // set random die images 
// 5.
    dice.forEach((dice, index) => // a kind of a for loop 
    {
    if (index === 0) 
    {
        const src = `./dice_${dicevalue01}.png`; // create a common file path for all photos and add it to source.
        dice.setAttribute('src', src); // set the above path to the displayed images dice01.
    } 
    else 
    {
        const src = `./dice_${dicevalue02}.png`;// create a common file path for all photos and add it to source.
        dice.setAttribute('src', src);// set the above path to the displayed images dice02.
    }
});


if(dicevalue01 === dicevalue02 && dicevalue01 === 1) //if dice value are equal and equal to 1
{
    gameplay[player].score = 0;// set the relevant player's score to 0.
} 
else 
{
    gameplay[player].score = gameplay[player].score + dicevalue01 + dicevalue02;// set the score.
}


if(player === 'player01') 
{
    player01score.innerText = getnumber(gameplay.player01.score) // set the score
    player01.style.border = "2px solid transparent";
} 
else 
{
    player02score.innerText = getnumber(gameplay.player02.score)
    player02.style.border = "2px solid transparent";
}



//console.log(`Player01 score = ${gameplay.player01.score}, Player02 score = ${gameplay.player02.score}`);

if(gameplay[player].score >= 100) 
{
    //console.log(`${player} won the game with ${gameplay[player].score} score.`)
    playbutton.disabled = true // playe button is disabled.
    resetbutton.disabled = false // reset button is enabled.
    if(player === 'player01') 
    {
        winmassage01.style.opacity =  "1";// display the winmassage according to the player.
        player01.style.border = "2px solid red"
    } 
    else 
    {
        winmassage02.style.opacity =  "1";
        player02.style.border = "2px solid red"
    }
}

if (dicevalue01 === dicevalue02 && dicevalue01 !== 1) 
{
    gameplay[player].turn = true; // if the player get same value in both dices, turn must be his and 
    gameplay[player === "player01" ? "player02" : "player01"].turn = false; // set the other player's turn to false.
} 
else 
{
    gameplay[player].turn = false;
    gameplay[player === "player01" ? "player02" : "player01"].turn = true;
}

if(gameplay.player01.turn) 
{
    player01.style.border = "2px solid blue"; // set the border according to the player's turn.
} 
else 
{
    player02.style.border = "2px solid blue"
}

});


resetbutton.addEventListener('click', () => 
{
    player01score.innerText = "000" // after reset all these will be reseted.
    player02score.innerText = "000"
    gameplay.player01.score = 0
    gameplay.player01.turn = true
    gameplay.player02.score = 0
    gameplay.player02.turn = false
    playbutton.disabled = false
    resetbutton.disabled = true
    player01.style.border = "2px solid blue"
    player02.style.border = "2px solid blue"
    winmassage01.style.opacity =  "0";
    winmassage02.style.opacity =  "0";


    dice.forEach((dice, index) => //to reset the dice images.
    {
    if (index === 0) 
    {
        const src = `./dice_${getarandomdicevalue()}.png`;
        dice.setAttribute('src', src);
    } 
    else 
    {
        const src = `./dice_${getarandomdicevalue()}.png`;
        dice.setAttribute('src', src);
    }
    });
});

gameplay.player01.turn = true;// after finish the game once, the turn will be set to player01.