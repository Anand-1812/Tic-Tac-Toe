// import { createInterface } from 'readline';

// const rl = createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// const grid = [
//     [' ', ' ', ' '],
//     [' ', ' ', ' '],
//     [' ', ' ', ' ']
// ];

// Create a user
function createPlayer(name, symbol) {
    return { name, symbol };
}

// // Game setup and functions
// function createGame(grid) {
//     function displayBoard() {
//         console.log('\nCurrent Board:');
//         for (let i = 0; i < 3; i++) {
//             console.log(' ' + grid[i].join(' | '));
//             if (i < 2) console.log('-----------');
//         }
//         console.log('');
//     }

//     function askPlayers(callback) {
//         rl.question('Player 1, enter your name: ', name1 => {
//             rl.question('Choose X or O: ', symbol1 => {
//                 symbol1 = symbol1.trim().toUpperCase();
//                 if (symbol1 !== 'X' && symbol1 !== 'O') {
//                     console.log('Invalid symbol. Please choose either X or O.');
//                     rl.close();
//                     return;
//                 }

//                 const player1 = createUser(name1.trim(), symbol1);
//                 const symbol2 = symbol1 === 'X' ? 'O' : 'X';

//                 rl.question('Player 2, enter your name: ', name2 => {
//                     const player2 = createUser(name2.trim(), symbol2);
//                     console.log(`\n${player1.name} is '${player1.symbol}'`);
//                     console.log(`${player2.name} is '${player2.symbol}'\n`);
//                     callback(player1, player2);
//                 });
//             });
//         });
//     }

//     return {
//         displayBoard,
//         askPlayers
//     };
// }

// // Game flow
// function gameFlow() {
//     function askPlayer(callback) {
//         rl.question('Enter row (0, 1, 2): ', row => {
//             row = parseInt(row);
//             rl.question('Enter column (0, 1, 2): ', column => {
//                 column = parseInt(column);
//                 callback(row, column);
//             });
//         });
//     }

//     return {
//         askPlayer
//     };
// }

// // check for win
// function checkWin(symbol) {
//     if (grid[0][0] === symbol && grid[1][1] === symbol && grid[2][2] === symbol) return true;
//     if (grid[0][2] === symbol && grid[1][1] === symbol && grid[2][0] === symbol) return true;

//     for (let i = 0;i < 3;i++) {
//         if (grid[i][0] === symbol && grid[i][1] === symbol && grid[i][2] === symbol) return true;
//         if (grid[0][i] === symbol && grid[1][i] === symbol && grid[2][i] === symbol) return true;
//     }

//     return false;
// }

// // checks for draw
// function isDraw() {
//     for (let row = 0;row < 3;row++) {
//         for (let col = 0;col < 3;col++) {
//             if (grid[row][col] === ' ') {
//                 return false;
//             }
//         }
//     }
//     return true;
// }

// // ----- function for changing turns -----

// function startTurns(currentPlayer, otherPlayer, game, flow) {

//     game.displayBoard();
//     console.log(`${currentPlayer.name} turn`);
//     flow.askPlayer((row, column) => {
//         if (row < 0 || row > 2 || column < 0 || column > 2 || grid[row][column] !== ' ') {
//             console.log('Invalid move, Try again');
//             return startTurns(currentPlayer, otherPlayer, game, flow);
//         }
//         grid[row][column] = currentPlayer.symbol;

//         if (checkWin(currentPlayer.symbol)) {
//             game.displayBoard();
//             console.log(`🎉 ${currentPlayer.name} wins!`);
//             rl.close();
//             return;
//         }

//         if (isDraw()) {
//             game.displayBoard();
//             console.log("It's a draw!");
//             rl.close();
//             return;
//         }

//         startTurns(otherPlayer, currentPlayer, game, flow);
//     });
// }

// // ----- Game Setup -----

// const game = createGame(grid);    
// const flow = gameFlow();
// game.displayBoard();

// game.askPlayers((player1, player2) => {
//     console.log('Game setup complete. Ready to play!');
//     startTurns(player1, player2, game, flow);
// });

// ---------- DOM ----------

function displayInDom() {
    const gameGrid = document.querySelectorAll(".box");

    gameGrid.forEach((box) => {
        box.addEventListener("click", () => {
            box.textContent = "X"; // Or "O", depending on the turn
        });
    });
}

displayInDom();

const option = document.querySelectorAll(".option-div button");
option.forEach((btn) => {
    btn.addEventListener("click", () => {
        const choose = btn.textContent;
        const player1 = createPlayer()
        console.log(choose);
    })
})
