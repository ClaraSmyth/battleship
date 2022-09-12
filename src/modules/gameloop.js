import player from './player';

const gameLoop = () => {
    const playerOne = player('Clara');
    const playerTwo = player();

    let currentPlayer = playerOne;
    let currentEnemy = playerTwo;

    let gameOver = false;
    let winner = null;

    while (!gameOver) {
        const randomIndex = Math.floor(Math.random() * currentEnemy.board.availableAttacks.length);
        const randomCoords = currentEnemy.board.availableAttacks[randomIndex];

        currentPlayer.attack(currentEnemy.board, randomCoords);
        gameOver = currentEnemy.board.checkWin();
        winner = gameOver ? currentPlayer.name : null;

        const nextPlayer = currentEnemy;

        currentEnemy = currentPlayer;
        currentPlayer = nextPlayer;
    }

    return winner;
};

export default gameLoop;
