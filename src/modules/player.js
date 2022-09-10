import gameBoard from './gameboard';

const player = () => {
    const playerShips = [
        [
            [5, 2],
            [5, 3],
        ],
        [
            [7, 2],
            [7, 3],
        ],
    ];

    const board = gameBoard(playerShips);

    return {
        board,

        attack(enemyBoard, attackCoords) {
            enemyBoard.receiveAttack(attackCoords);
        },
    };
};

export default player;
