import gameBoard from "../modules/gameboard";

describe('Gameboard', () => {
    test('Gameboard factory returns an object with receiveAttack()', () => {
        expect(gameBoard([[[5, 2], [5, 3]]])).toStrictEqual({
            availableAttacks: expect.any(Array),
            receiveAttack: expect.any(Function),
            checkWin: expect.any(Function),
            checkRemaining: expect.any(Function)
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

    test('Gameboard checkWin() returns true if all ships are sunk', () => {
        let board = gameBoard([[[5, 2], [5, 3]], [[7, 2], [7, 3]]])

        board.receiveAttack([5, 2])
        board.receiveAttack([5, 3])
        board.receiveAttack([7, 2])
        board.receiveAttack([7, 3])

        expect(board.checkWin()).toBe(true);
    })

    test('Gameboard checkWin() returns false if all ships are not sunk', () => {
        let board = gameBoard([[[5, 2], [5, 3]]])

        expect(board.checkWin()).toBe(false);
    })

    test('Gameboard checkRemaining() returns the remaining number of ships', () => {
        let board = gameBoard([[[5, 2], [5, 3]], [[7, 2], [7, 3]]])

        board.receiveAttack([5, 2])
        board.receiveAttack([5, 3])

        expect(board.checkRemaining()).toBe(1);
    })
})