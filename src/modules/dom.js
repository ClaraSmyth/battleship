import randomShips from './randomShips';

const buildBoards = () => {
    const boardOne = document.querySelector('.board-one');
    const boardTwo = document.querySelector('.board-two');

    boardOne.textContent = '';
    boardTwo.textContent = '';

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

const updateBoard = (coords, attack, player, enemy) => {
    const boardOne = document.querySelector('.board-one');
    const boardTwo = document.querySelector('.board-two');

    const board = player.name ? boardTwo : boardOne;

    for (let i = 0; i < board.childNodes.length; i++) {
        const node = board.childNodes[i];

        if (node.dataset.coords === coords.toString()) {
            node.classList.add(attack ? 'hit' : 'miss');
            break;
        }
    }

    const sunkShips = enemy.board.checkSunk();

    if (sunkShips) {
        sunkShips.forEach((ship) => {
            ship.coords.forEach((coord) => {
                for (let i = 0; i < board.childNodes.length; i++) {
                    const node = board.childNodes[i];

                    if (node.dataset.coords === coord.toString()) {
                        node.classList.add('sunk');
                        break;
                    }
                }
            });
        });
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

const startGameModal = () => {
    const board = document.querySelector('.modal-board');

    for (let i = 9; i >= 0; i--) {
        for (let j = 0; j <= 9; j++) {
            const div = document.createElement('div');

            div.setAttribute('data-coords', `${i},${j}`);
            div.classList.add('modal-board-cell');

            board.append(div);
        }
    }

    const ships = randomShips();

    ships.forEach((ship) => {
        const coords = ship[0];

        let isVert = false;
        if (ship.length > 1) isVert = ship[0][0] !== ship[1][0];

        const rotation = isVert ? 'vert' : 'hor';

        for (let i = 0; i < board.childNodes.length; i++) {
            const node = board.childNodes[i];

            if (node.dataset.coords === coords.toString()) {
                const div = document.createElement('div');
                div.classList.add('modal-board-ship');
                div.classList.add(`${rotation}-${ship.length}`);
                node.append(div);
                break;
            }
        }
    });
};

export { buildBoards, boardController, updateBoard, showPlayerShips, startGameModal };
