import player from "../modules/player";

describe('Player', () => {
    test('Player factory returns an object with board and attack()', () => {
        expect(player()).toStrictEqual({
            board: expect.any(Object),
            attack: expect.any(Function),
        });
    })
})