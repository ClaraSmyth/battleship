import player from "../modules/player";

describe('Player', () => {
    test('Player factory returns an object with board and attack()', () => {
        expect(player([[[5, 2], [5, 3]], [[7, 2], [7, 3]]])).toStrictEqual({
            board: expect.any(Object),
            attack: expect.any(Function),
        });
    })

    test('Player can attack enemy player board', () => {
        const playerOne = player([[[5, 2], [5, 3]], [[7, 2], [7, 3]]]);
        const playerTwo = player([[[5, 2], [5, 3]], [[7, 2], [7, 3]]]);

        playerOne.attack(playerTwo.board, [5, 2])
        playerOne.attack(playerTwo.board, [5, 3])
        playerOne.attack(playerTwo.board, [7, 2])
        playerOne.attack(playerTwo.board, [7, 3])

        expect(playerTwo.board.checkWin()).toBe(true);
    })
})