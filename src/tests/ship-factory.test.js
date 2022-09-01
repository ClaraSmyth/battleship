import ship from "../modules/ship-factory";

test('Ship factory returns an object with length, cells, hit() and isSunk()', () => {
    expect(ship(3)).toStrictEqual({
        length: 3,
        cells: [false, false, false],
        hit: expect.any(Function),
        isSunk: expect.any(Function),
    });
})