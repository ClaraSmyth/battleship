import gameBoard from "../modules/gameboard";

describe('Gameboard', () => {
    test('Gameboard factory returns an object with receiveAttack()', () => {
        expect(gameBoard([[[5, 2], [5, 3]]])).toStrictEqual({
            receiveAttack: expect.any(Function),
        })
    })

    test('Gameboard receiveAttack() returns true if there is a hit', () => {
        let board = gameBoard([[[5, 2], [5, 3]]])

        expect(board.receiveAttack([5, 2])).toBe(true);
    })

    test('Gameboard receiveAttack() returns false if there is no hit', () => {
        let board = gameBoard([[[5, 2], [5, 3]]])

        expect(board.receiveAttack([5, 4])).toBe(false);
    })
})