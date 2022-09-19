const buildBoards = () => {
    const boardOne = document.querySelector('.board-one');
    const boardTwo = document.querySelector('.board-two');

    for (let i = 9; i >= 0; i--) {
        for (let j = 0; j <= 9; j++) {
            const div = document.createElement('div');
            const div2 = document.createElement('div');

            div.setAttribute('data-coords', `${i},${j}`);
            div.classList.add('board-cell');

            div2.setAttribute('data-coords', `${i},${j}`);
            div2.classList.add('board-cell');

            boardOne.append(div);
            boardTwo.append(div2);
        }
    }
};

const boardController = (gameloop) => {
    const boardTwo = document.querySelector('.board-two');

    boardTwo.addEventListener('click', (e) => {
        const coords = e.target.dataset.coords.split(',').map(Number);
        gameloop.takeTurn(coords);
    });
};

const updateBoard = (coords, attack, player) => {
    const boardOne = document.querySelector('.board-one');
    const boardTwo = document.querySelector('.board-two');

    const board = player ? boardTwo : boardOne;

    for (let i = 0; i < board.childNodes.length; i++) {
        const node = board.childNodes[i];

        if (node.dataset.coords === coords.toString()) {
            node.classList.add(attack ? 'hit' : 'miss');
            break;
        }
    }
};

const showPlayerShips = (playerShips) => {
    const boardOne = document.querySelector('.board-one');

    playerShips.forEach((ship) => {
        ship.forEach((coords) => {
            for (let i = 0; i < boardOne.childNodes.length; i++) {
                const node = boardOne.childNodes[i];

                if (node.dataset.coords === coords.toString()) {
                    node.classList.add('friendly');
                    break;
                }
            }
        });
    });
};

export { buildBoards, boardController, updateBoard, showPlayerShips };
