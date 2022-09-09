let cards = []
let sum = 0
let cardEl = document.getElementById("cardElement")
let sumEl = document.getElementById("sumElement")
let rewardel = document.getElementById("rewardEl")
let playersScoreEl = document.getElementById("PlayersScore")
let scoreBoardEl = document.getElementById("scoreBoard")
let message = ""
let prizes = []
let indOfprize = -1
let NoOfPlayers = 0;
// By default No.of attemp per Player=10//
let NoOfAttempt = 10;
let isSelected = false;
let hasBlackjack = false
let isAlive = false

function newGame() {
    for (let i = 0; i < NoOfPlayers; i++) {
        playersScoreEl.removeChild(playersScoreEl.lastChild)
    }
    isAlive = false
    hasBlackjack = false
    isSelected = false;
    NoOfAttempt = 10;
    NoOfPlayers = 0;
    indOfprize = -1
    prizes = []
    message = ""
    sum = 0
    cards = []
    cardEl.textContent = "Cards:"
    sumEl.textContent = "Sum:"
    rewardel.textContent = ""
    scoreBoardEl.textContent = ""
}


function createScoreCard(num) {
    let result = document.createElement("p")
    playersScoreEl.appendChild(result);
    result.setAttribute("id", num.name)
    result.textContent = num.name + " : " + 0 + "$"
    result.classList.add("teamPlayersScore");
}


function teams() {
    if (document.getElementById("quantity").value != "" &&
        document.getElementById("quantity").value < 7 &&
        document.getElementById("quantity").value > 1) {
        if (!isSelected) {
            NoOfPlayers = document.getElementById("quantity").value
            NoOfAttempt = NoOfAttempt * NoOfPlayers
            scoreBoardEl.textContent = "ScoreBoard";
            for (let i = 0; i < NoOfPlayers; i++) {
                let player = {
                    name: "Team" + (i + 1),
                    reward: 0,
                }
                prizes.push(player);
                createScoreCard(player);
            }
            isSelected = true;
        } else {
            document.getElementById("quantity").value = NoOfPlayers
        }
    } else {
        alert("Please! select valid No. of players");
        document.getElementById("quantity").value = NoOfPlayers
    }
}

function randomCard() {
    let RandomNumber = Math.ceil(12 * Math.random())
    if (RandomNumber === 1) {
        RandomNumber = 11
    } else if (RandomNumber > 10) {
        RandomNumber = 10
    }
    return RandomNumber
}

function startGame() {
    if (isSelected) {
        if (NoOfAttempt > 0) {
            if (document.getElementById("quantity").value != "" &&
                document.getElementById("quantity").value < 7 &&
                document.getElementById("quantity").value > 1) {
                rewardel.style.color = "goldenrod"
                rewardel.style.fontSize = "20px"
                rewardel.style.fontWeight = "bold"
                isAlive = true
                let firstCard = randomCard()
                let secondCard = randomCard()
                cards = [firstCard, secondCard]
                if (indOfprize != -1) {
                    document.getElementById(prizes[indOfprize].name).classList.remove("currentPlayer")
                }
                indOfprize++;
                indOfprize = indOfprize % NoOfPlayers
                document.getElementById(prizes[indOfprize].name).classList.add("currentPlayer")
                renderGame(prizes[indOfprize])
            } else {
                alert("Please! select valid No. of players");
                document.getElementById("quantity").value = NoOfPlayers
            }
        } else {
            document.getElementById(prizes[NoOfPlayers - 1].name).classList.remove("currentPlayer")
            document.getElementById(prizes[0].name).classList.remove("currentPlayer")
            prizes.sort((a, b) => b.reward - a.reward)
            if (prizes[0].reward != prizes[1].reward) {
                scoreBoardEl.textContent = "The Winner is " + prizes[0].name + " with highest Score of " + prizes[0].reward + "$"
                document.getElementById(prizes[0].name).classList.add("winner")
            } else {
                scoreBoardEl.textContent = "Game Tied"
            }
            rewardel.textContent = ""
            isAlive = false
        }
        NoOfAttempt--;
    } else {
        alert("Please! show the teams")
    }
}

function addNewCard() {
    if (isSelected) {
        if (isAlive) {
            if (document.getElementById("quantity").value != "" &&
                document.getElementById("quantity").value < 7 &&
                document.getElementById("quantity").value > 1) {
                let newcard = randomCard();
                cards.push(newcard);
                renderGame(prizes[indOfprize])
            } else {
                alert("Please! select valid No. of players");
                document.getElementById("quantity").value = NoOfPlayers
            }
        } else {
            alert("You can't take more cards ");
            document.getElementById("quantity").value = NoOfPlayers
        }
    } else {
        alert("Please! show the teams")
    }

}

function renderGame(curr) {

    sum = 0
    for (let i = 0; i < cards.length; i++) {
        sum += cards[i]
    }
    cardEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum
    if (sum < 21) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        curr.reward += 5
        document.getElementById(curr.name).textContent = curr.name + " : " + curr.reward + "$"
        rewardel.style.color = "#bc81e3";
        message = "You have won a Blackjack & Score: " + 5 + "$";
        isAlive = false;
        document.getElementById(curr.name).classList.remove("currentPlayer")
        document.getElementById(prizes[(indOfprize + 1) % NoOfPlayers].name).classList.add("currentPlayer")
    } else if (sum > 21) {
        rewardel.style.color = "white"
        message = "Sorry,Pass the Game to Next Team!"
        isAlive = false;
        document.getElementById(curr.name).classList.remove("currentPlayer")
        document.getElementById(prizes[(indOfprize + 1) % NoOfPlayers].name).classList.add("currentPlayer")
    }
    rewardel.textContent = message;
}
