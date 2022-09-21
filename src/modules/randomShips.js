const randomCoords = (length) => {
    const direction = Math.round(Math.random());
    const coords = [];

    if (direction) {
        const x = Math.floor(Math.random() * (10 - length));
        const y = Math.floor(Math.random() * 10);

        for (let i = 0; i < length; i++) {
            coords.push([x + i, y]);
        }
    }

    if (!direction) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * (10 - length));

        for (let i = 0; i < length; i++) {
            coords.push([x, y + i]);
        }
    }

    return coords;
};

const randomShips = () => {
    const shipArr = [randomCoords(5)];

    while (shipArr.length < 5) {
        const newCoords = randomCoords(5 - shipArr.length);

        const unique = newCoords.every((newCoord) => {
            return shipArr.every((ship) => {
                return ship.every((shipCoords) => {
                    return shipCoords.toString() !== newCoord.toString();
                });
            });
        });

        if (unique) shipArr.push(newCoords);
    }

    return shipArr;
};

export default randomShips;
