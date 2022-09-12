import player from "../modules/player";

describe('Player', () => {
    test('Player factory returns an object with board and attack()', () => {
        expect(player()).toStrictEqual({
            board: expect.any(Object),
            name: expect.any(String),
            attack: expect.any(Function),
        });
    })

    test('Player can attack enemy player board', () => {
        const playerOne = player('Name', [[[5, 2], [5, 3]], [[7, 2], [7, 3]]]);
        const playerTwo = player('Name', [[[5, 2], [5, 3]], [[7, 2], [7, 3]]]);

        playerOne.attack(playerTwo.board, [5, 2])
        playerOne.attack(playerTwo.board, [5, 3])
        playerOne.attack(playerTwo.board, [7, 2])
        playerOne.attack(playerTwo.board, [7, 3])

        expect(playerTwo.board.checkWin()).toBe(true);
    })

    test('Player factory should contain 5 random ships when not given any array', () => {
        const playerOne = player();

        expect(playerOne.board.checkRemaining()).toBe(5)
    })
})