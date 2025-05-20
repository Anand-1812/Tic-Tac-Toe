let board = ["", "", "", "", "", "", "", "", ""];

let player1 = null;
let player2 = null;
let currentPlayer = null;

const playBtn = document.getElementById("play-btn");
const userDiv = document.querySelector(".user-div");
const turnDisplay = document.getElementById("turnmessage");
const containerDiv = document.querySelector(".container");
const grid = document.querySelectorAll(".box");

turnDisplay.innerHTML = "";
turnDisplay.style.display = "none";

// Winning combinations
const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
];

// Show user input form and container on Play button click
playBtn.addEventListener("click", () => {
    userDiv.classList.add("show");
    containerDiv.classList.add("show-div");
    playBtn.style.display = "none";
});

// Hide userDiv after fade out transition ends
userDiv.addEventListener("transitionend", () => {
    if (userDiv.classList.contains("hide")) {
        userDiv.style.display = "none";
        userDiv.classList.remove("show", "hide");
    }
});

function displayInDom(userDiv, turnDisplay) {
    function optionBtn() {
        const option = document.querySelectorAll(".option-div button");

        option.forEach((btn) => {
            btn.addEventListener("click", () => {
                const name1 = document.getElementById("first-player").value.trim();
                const name2 = document.getElementById("second-player").value.trim();

                if (!name1 || !name2) {
                    alert("Please enter both player names.");
                    return;
                }

                const chosenSymbol = btn.textContent;

                // Assign to global player variables
                player1 = { name: name1, symbol: chosenSymbol };
                player2 = { name: name2, symbol: chosenSymbol === "X" ? "O" : "X" };
                currentPlayer = player1;

                // Fade out user input form
                userDiv.classList.add("hide");

                // Clear inputs
                document.getElementById("first-player").value = "";
                document.getElementById("second-player").value = "";

                displayTurn();
                enableMove();
            });
        });
    }

    function displayTurn() {
        turnDisplay.style.display = "block";
        turnDisplay.textContent = `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
    }

    function enableMove() {
        board = ["", "", "", "", "", "", "", "", ""]; // reset board
        grid.forEach(box => {
            box.textContent = "";
            box.style.pointerEvents = "auto";
            box.style.color = "#FFFFFF";  // reset color if needed
            box.addEventListener("click", handleMove, { once: true });
        });
    }

    function handleMove(e) {
        const box = e.target;
        const index = Array.from(grid).indexOf(box);

        box.textContent = currentPlayer.symbol;
        box.style.pointerEvents = "none";

        board[index] = currentPlayer.symbol;

        if (checkWin(currentPlayer.symbol)) {
            turnDisplay.textContent = `${currentPlayer.name} wins! 🎉`;
            disableBoard();
            return;
        }

        if (checkDraw()) {
            turnDisplay.textContent = "It's a draw!";
            return;
        }

        switchPlayer();
        displayTurn();
    }

    function checkWin(symbol) {
        return winningCombos.some(combo =>
            combo.every(index => board[index] === symbol)
        );
    }

    function checkDraw() {
        return board.every(cell => cell !== "");
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function disableBoard() {
        grid.forEach(box => {
            box.style.pointerEvents = "none";
        });
    }

    return {
        optionBtn,
        displayTurn,
        enableMove
    };
}

// Initialize
const uiHandler = displayInDom(userDiv, turnDisplay);
uiHandler.optionBtn();
