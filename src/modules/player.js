import gameBoard from './gameboard';
import randomShips from './randomShips';

const player = (name = null, shipArr = null) => {
    const playerShips = shipArr || randomShips();

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
