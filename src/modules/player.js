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
        attack() {
            const attackCoords = [5, 3];
            board.receiveAttack(attackCoords);
        },
    };
};

export default player;
