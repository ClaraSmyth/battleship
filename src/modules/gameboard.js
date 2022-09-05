import ship from './ship';

const gameBoard = (arr) => {
    const ships = [];
    const missedAttacks = [];

    arr.forEach((coord) => {
        const newShip = ship(coord.length);
        newShip.coords = coord;
        ships.push(newShip);
    });

    return {
        receiveAttack(attackCoords) {
            return ships.some((currentShip) => {
                let currentIndex = null;

                const checkHit = currentShip.coords.some((coord, index) => {
                    currentIndex = index;
                    return attackCoords.toString() === coord.toString();
                });

                if (checkHit) currentShip.hit(currentIndex);
                if (!checkHit) missedAttacks.push(attackCoords);

                return checkHit;
            });
        },

        checkWin() {
            return ships.every((currentShip) => {
                return currentShip.isSunk();
            });
        },
    };
};

export default gameBoard;
