import ship from './ship';

const gameBoard = (arr) => {
    const ships = [];
    const missedAttacks = [];
    const availableAttacks = [];

    arr.forEach((coord) => {
        const newShip = ship(coord.length);
        newShip.coords = coord;
        ships.push(newShip);
    });

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            availableAttacks.push([i, j]);
        }
    }

    return {
        availableAttacks,

        receiveAttack(attackCoords) {
            const attackIndex = availableAttacks.findIndex((elem) => elem.toString() === attackCoords.toString());
            availableAttacks.splice(attackIndex, 1);

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

        checkRemaining() {
            let count = ships.length;

            ships.forEach((currentShip) => {
                if (currentShip.isSunk()) count -= 1;
            });

            return count;
        },
    };
};

export default gameBoard;
