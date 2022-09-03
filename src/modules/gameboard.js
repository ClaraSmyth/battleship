import ship from './ship';

const gameBoard = (arr) => {
    const ships = [];
    // const missedAttacks = [];

    arr.forEach((coord) => {
        const newShip = ship(coord.length);
        newShip.coords = coord;
        ships.push(newShip);
    });

    return {
        receiveAttack(coords) {
            return ships.some((obj) => {
                return obj.coords.some((coord) => {
                    return coords.toString() === coord.toString();
                });
            });
        },
    };
};

export default gameBoard;
