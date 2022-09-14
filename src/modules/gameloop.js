import player from './player';

const gameLoop = () => {
    let currentPlayer = player('Clara');
    let currentEnemy = player();

    let gameOver = false;

    const updatedPlayer = () => {
        const nextPlayer = currentEnemy;
        currentEnemy = currentPlayer;
        currentPlayer = nextPlayer;
    };

    const aiTurn = () => {
        const randomIndex = Math.floor(Math.random() * currentEnemy.board.availableAttacks.length);
        const randomCoords = currentEnemy.board.availableAttacks[randomIndex];

        currentPlayer.attack(currentEnemy.board, randomCoords);
        gameOver = currentEnemy.board.checkWin();

        updatedPlayer();
    };

    return {
        takeTurn(coords) {
            const checkCoords = currentEnemy.board.availableAttacks.some(
                (elem) => elem.toString() === coords.toString()
            );

            if (!checkCoords) return;

            currentPlayer.attack(currentEnemy.board, coords);
            gameOver = currentEnemy.board.checkWin();

            updatedPlayer();
            aiTurn();
        },
    };
};

export default gameLoop;
