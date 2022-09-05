const ship = (length) => {
    const cells = [];

    for (let i = 0; i < length; i++) cells.push(false);

    return {
        length,

        cells,

        hit(num) {
            cells[num] = true;
        },

        isSunk() {
            return cells.every((cell) => cell === true);
        },
    };
};

export default ship;
