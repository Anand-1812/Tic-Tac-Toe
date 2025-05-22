function TicTacToeGame(config) {
    const board = Array(9).fill("");
    let player1 = null;
    let player2 = null;
    let currentPlayer = null;

    const {
        playBtn,
        userDiv,
        turnDisplay,
        containerDiv,
        grid,
        popUp,
        resultMessage,
        playAgainBtn
    } = config;

    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    function init() {
        playBtn.addEventListener("click", () => {
            userDiv.classList.add("show");
            containerDiv.classList.add("show-div");
            playBtn.style.display = "none";
        });

        userDiv.addEventListener("transitionend", () => {
            if (userDiv.classList.contains("hide")) {
                userDiv.style.display = "none";
                userDiv.classList.remove("show", "hide");
            }
        });

        playAgainBtn.addEventListener("click", () => {
            popUp.close();
            enableBoard();
            displayTurn();
        });

        bindSymbolChoice();
    }

    function bindSymbolChoice() {
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
                player1 = { name: name1, symbol: chosenSymbol };
                player2 = { name: name2, symbol: chosenSymbol === "X" ? "O" : "X" };
                currentPlayer = player1;

                userDiv.classList.add("hide");
                document.getElementById("first-player").value = "";
                document.getElementById("second-player").value = "";

                enableBoard();
                displayTurn();
            });
        });
    }

    function enableBoard() {
        for (let i = 0; i < 9; i++) board[i] = "";
        grid.forEach((box, index) => {
            box.textContent = "";
            box.style.pointerEvents = "auto";
            box.style.color = "#FFFFFF";
            box.addEventListener("click", () => handleMove(index, box), { once: true });
        });
    }

    function handleMove(index, box) {
        board[index] = currentPlayer.symbol;
        box.textContent = currentPlayer.symbol;
        box.style.pointerEvents = "none";

        if (checkWin(currentPlayer.symbol)) {
            turnDisplay.textContent = `${currentPlayer.name} wins! 🎉`;
            showPopup(`${currentPlayer.name} wins! 🎉`);
            disableBoard();
            return;
        }

        if (checkDraw()) {
            turnDisplay.textContent = "It's a draw!";
            showPopup("It's a draw!");
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
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

    function displayTurn() {
        turnDisplay.style.display = "block";
        turnDisplay.textContent = `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
    }

    function disableBoard() {
        grid.forEach(box => {
            box.style.pointerEvents = "none";
        });
    }

    function showPopup(message) {
        resultMessage.textContent = message;
        popUp.showModal();
    }

    return {
        init
    };
}

// object of the game
const game = TicTacToeGame({
    playBtn: document.getElementById("play-btn"),
    userDiv: document.querySelector(".user-div"),
    turnDisplay: document.getElementById("turnmessage"),
    containerDiv: document.querySelector(".container"),
    grid: document.querySelectorAll(".box"),
    popUp: document.getElementById("play-again"),
    resultMessage: document.getElementById("result-message"),
    playAgainBtn: document.getElementById("play-again-btn")
});

game.init(); // Start the game