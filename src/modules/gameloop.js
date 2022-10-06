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
        const attack = currentPlayer.attack(currentEnemy.board, attackCoords);

        if (attack) {
            const surrounding = [];
            surrounding.push([attackCoords[0] + 1, attackCoords[1]]);
            surrounding.push([attackCoords[0] - 1, attackCoords[1]]);
            surrounding.push([attackCoords[0], attackCoords[1] + 1]);
            surrounding.push([attackCoords[0], attackCoords[1] - 1]);

            surrounding.forEach((coords) => {
                const checkCoords = currentEnemy.board.availableAttacks.some(
                    (elem) => elem.toString() === coords.toString()
                );

                if (checkCoords) aiNextAttacks.unshift(coords);
            });
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
