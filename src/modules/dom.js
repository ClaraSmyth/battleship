// eslint-disable-next-line import/no-cycle
import gameLoop from './gameloop';
import randomShips from './randomShips';

const buildBoards = () => {
    const [boardOneContainer, boardTwoContainer] = document.querySelectorAll('.board-container');
    const boardOne = document.createElement('div');
    const boardTwo = document.createElement('div');

    boardOne.classList.add('board-one');
    boardTwo.classList.add('board-two');

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

    if (boardOneContainer.childElementCount > 1) {
        boardOneContainer.removeChild(boardOneContainer.lastChild);
        boardTwoContainer.removeChild(boardTwoContainer.lastChild);
    }

    boardOneContainer.append(boardOne);
    boardTwoContainer.append(boardTwo);
};

const boardController = (gameloop) => {
    const boardTwo = document.querySelector('.board-two');

    boardTwo.addEventListener('click', (e) => {
        if (!e.target.dataset.coords) return;
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

const rotateShip = (ship) => {
    const newShip = [];
    let outOfBounds = false;

    if (ship.length < 2) return ship;

    // If ship is horizontal rotate vertical
    if (ship[0][0] === ship[1][0]) {
        ship.forEach((coord, index) => {
            const x = coord[0] - index;
            const y = coord[1] - index;
            if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;
            newShip.push([x, y]);
        });
    }

    // If ship is vertical rotate horizontal
    if (ship[0][0] !== ship[1][0]) {
        ship.forEach((coord, index) => {
            const x = coord[0] + index;
            const y = coord[1] + index;
            if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;
            newShip.push([x, y]);
        });
    }

    if (outOfBounds) return ship;

    return newShip;
};

const moveShip = (ship, newCoords) => {
    const newShip = [];
    let outOfBounds = false;

    if (ship.length < 2) return newCoords;

    // If ship is horizontal make ship at new coords
    if (ship[0][0] === ship[1][0]) {
        ship.forEach((coord, index) => {
            const x = newCoords[0];
            const y = newCoords[1] + index;
            if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;
            newShip.push([x, y]);
        });
    }

    // If ship is vertical make ship at new coords
    if (ship[0][0] !== ship[1][0]) {
        ship.forEach((coord, index) => {
            const x = newCoords[0] - index;
            const y = newCoords[1];
            if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;
            newShip.push([x, y]);
        });
    }

    if (outOfBounds) return ship;

    return newShip;
};

const buildModalBoard = (board, ships) => {
    // Builds the board cells
    for (let i = 9; i >= 0; i--) {
        for (let j = 0; j <= 9; j++) {
            const div = document.createElement('div');

            div.setAttribute('data-coords', `${i},${j}`);
            div.classList.add('modal-board-cell');

            board.append(div);
        }
    }

    // Places the ships on the board
    ships.forEach((ship, index) => {
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
                div.setAttribute('data-index', index);
                div.setAttribute('draggable', 'true');

                node.append(div);
                break;
            }
        }
    });
};

const arrangeShips = (ships) => {
    // Adds ability to rotate ships on board
    const boardShips = document.querySelectorAll('.modal-board-ship');

    boardShips.forEach((boardShip) => {
        boardShip.addEventListener('click', (e) => {
            const ship = ships[e.target.dataset.index];
            const rotatedShip = rotateShip(ship);
            const newShips = [...ships];

            // If rotatedShip had coords out of bounds return early
            if (ship.toString() === rotatedShip.toString()) return;

            // Remove original ship from newShips array
            newShips.splice(e.target.dataset.index, 1);

            // Test if rotatedShip can fit in array
            const unique = rotatedShip.every((rotatedCoords) => {
                return newShips.every((newShip) => {
                    return newShip.every((newCoords) => {
                        return rotatedCoords.toString() !== newCoords.toString();
                    });
                });
            });

            if (unique) {
                // Adds the rotatedShip to the original ships array
                ships.splice(e.target.dataset.index, 1, rotatedShip);
                e.target.classList.toggle(`hor-${rotatedShip.length}`);
                e.target.classList.toggle(`vert-${rotatedShip.length}`);
            }
        });

        // Adds ability to drag ships on board
        const boardCells = document.querySelectorAll('.modal-board-cell');

        boardCells.forEach((cell) => {
            cell.addEventListener('dragover', (e) => {
                e.preventDefault();
                const draggable = document.querySelector('.dragging');
                const ship = ships[draggable.dataset.index];
                const movedShip = moveShip(ship, cell.dataset.coords.split(',').map(Number));
                const newShips = [...ships];

                // If rotatedShip had coords out of bounds return early
                if (ship.toString() === movedShip.toString() && movedShip.length > 2) return;

                // Remove original ship from newShips array
                newShips.splice(draggable.dataset.index, 1);

                // Test if moved Ship can fit in array
                const unique = movedShip.every((movedCoords) => {
                    return newShips.every((newShip) => {
                        return newShip.every((newCoords) => {
                            return movedCoords.toString() !== newCoords.toString();
                        });
                    });
                });

                if (unique) {
                    // Adds the movedShip to the original ships array
                    ships.splice(draggable.dataset.index, 1, movedShip);
                    cell.append(draggable);
                }
            });
        });

        boardShip.addEventListener('dragstart', () => {
            boardShip.classList.add('dragging');
        });

        boardShip.addEventListener('dragend', () => {
            boardShip.classList.remove('dragging');
        });
    });
};

const startGameModal = () => {
    const board = document.querySelector('.modal-board');
    const form = document.querySelector('.modal-form');
    const randomButton = document.querySelector('.modal-random');

    let ships = randomShips();

    buildModalBoard(board, ships);
    arrangeShips(ships);

    // Starts the game on submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.querySelector('.modal-name-input');
        const name = document.querySelector('.board-one-title');
        const modal = document.querySelector('.modal');
        const newGame = gameLoop(nameInput.value, ships);

        modal.classList.add('display-none');
        name.innerText = nameInput.value;

        boardController(newGame);
    });

    // Randomises the ships on board
    randomButton.addEventListener('click', () => {
        ships = randomShips();
        board.textContent = '';
        buildModalBoard(board, ships);
        arrangeShips(ships);
    });
};

const gameOver = (currentPlayer) => {
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal-title');
    const outCome = document.querySelector('.modal-outcome');

    outCome.innerText = `You ${currentPlayer.name ? 'Won' : 'Lost'}!`;
    outCome.classList.remove('display-none');
    modalTitle.innerText = 'Rearrange your ships and play again!';
    modal.classList.remove('display-none');

    buildBoards();
};

export { buildBoards, boardController, updateBoard, showPlayerShips, startGameModal, gameOver };
