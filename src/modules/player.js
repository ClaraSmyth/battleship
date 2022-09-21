import gameBoard from './gameboard';
import randomShips from './randomShips';

const player = (name = null, shipArr = []) => {
    const playerShips = shipArr;

    if (!playerShips.length) {
        playerShips.push(...randomShips());
    }

    const board = gameBoard(playerShips);

    return {
        playerShips,
        board,
        name,

        attack(enemyBoard, attackCoords) {
            return enemyBoard.receiveAttack(attackCoords);
        },
    };
};

export default player;
