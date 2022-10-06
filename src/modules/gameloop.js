// eslint-disable-next-line import/no-cycle
import { gameOver, showPlayerShips, updateBoard } from './dom';
import player from './player';

const gameLoop = (name = null, shipArr = null) => {
    let currentPlayer = player(name, shipArr);
    let currentEnemy = player();

    showPlayerShips(currentPlayer.playerShips);

    const updatePlayer = () => {
        const nextPlayer = currentEnemy;
        currentEnemy = currentPlayer;
        currentPlayer = nextPlayer;
    };

    const aiNextAttacks = [];

    const aiTurn = () => {
        const randomIndex = Math.floor(Math.random() * currentEnemy.board.availableAttacks.length);
        const randomCoords = currentEnemy.board.availableAttacks[randomIndex];
        const attackCoords = aiNextAttacks.length > 0 ? aiNextAttacks.shift() : randomCoords;

        const checkCoords = currentEnemy.board.availableAttacks.some(
            (elem) => elem.toString() === attackCoords.toString()
        );

        if (!checkCoords) {
            aiTurn();
            return;
        }

        const attack = currentPlayer.attack(currentEnemy.board, attackCoords);

        if (attack) {
            aiNextAttacks.push([attackCoords[0] + 1, attackCoords[1]]);
            aiNextAttacks.push([attackCoords[0], attackCoords[1] + 1]);
            aiNextAttacks.push([attackCoords[0] - 1, attackCoords[1]]);
            aiNextAttacks.push([attackCoords[0], attackCoords[1] - 1]);
        }

        updateBoard(attackCoords, attack, currentPlayer, currentEnemy);

        if (currentEnemy.board.checkWin()) {
            gameOver(currentPlayer);
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
                gameOver(currentPlayer);
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
