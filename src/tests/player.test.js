import player from "../modules/player";

describe('Player', () => {
    test('Player factory returns an object with board and attack()', () => {
        expect(player()).toStrictEqual({
            board: expect.any(Object),
            attack: expect.any(Function),
        });
    })

    test('Player can attack enemy player board', () => {
        const playerOne = player();
        const playerTwo = player();

        playerOne.attack(playerTwo.board, [5, 2])
        playerOne.attack(playerTwo.board, [5, 3])
        playerOne.attack(playerTwo.board, [7, 2])
        playerOne.attack(playerTwo.board, [7, 3])

        expect(playerTwo.board.checkWin()).toBe(true);
    })
})