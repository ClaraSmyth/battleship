import { buildBoards, showPlayerShips, updateBoard } from './dom';
import player from './player';

const gameLoop = () => {
    let currentPlayer = player('Clara');
    let currentEnemy = player();

    showPlayerShips(currentPlayer.playerShips);

    const gameOver = () => {
        currentPlayer = currentPlayer.name ? player(`${currentPlayer.name}`) : player();
        currentEnemy = currentPlayer.name ? player() : player(`${currentPlayer.name}`);
        buildBoards();
        showPlayerShips(currentPlayer.playerShips);
    };

    const updatePlayer = () => {
        const nextPlayer = currentEnemy;
        currentEnemy = currentPlayer;
        currentPlayer = nextPlayer;
    };

    const aiTurn = () => {
        const randomIndex = Math.floor(Math.random() * currentEnemy.board.availableAttacks.length);
        const randomCoords = currentEnemy.board.availableAttacks[randomIndex];

        const attack = currentPlayer.attack(currentEnemy.board, randomCoords);

        updateBoard(randomCoords, attack, currentPlayer, currentEnemy);

        if (currentEnemy.board.checkWin()) {
            gameOver();
            return;
        }

        if (!attack) updatePlayer();
        if (attack) aiTurn();
    };

    return {
        takeTurn(coords) {
            const checkCoords = currentEnemy.board.availableAttacks.some(
                (elem) => elem.toString() === coords.toString()
            );

            if (!checkCoords) return;

            const attack = currentPlayer.attack(currentEnemy.board, coords);

            updateBoard(coords, attack, currentPlayer, currentEnemy);

            if (currentEnemy.board.checkWin()) {
                gameOver();
                return;
            }

            if (!attack) {
                updatePlayer();
                aiTurn();
            }
        },
    };
};

export default gameLoop;
