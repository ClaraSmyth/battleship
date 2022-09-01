import ship from "../modules/ship-factory";

describe('Ship', () => {
    test('Ship factory returns an object with length, cells, hit() and isSunk()', () => {
        expect(ship(3)).toStrictEqual({
            length: 3,
            cells: [false, false, false],
            hit: expect.any(Function),
            isSunk: expect.any(Function),
        });
    })
    
    test('Ship hit() modifies the cell of input number', () => {
        const newShip = ship(3);
        newShip.hit(1);
        expect(newShip.cells).toStrictEqual([false, true, false]);
    })
    
    test('Ship isSunk() returns false if all cells are not hit', () => {
        const newShip = ship(2);
        newShip.hit(0);
        expect(newShip.isSunk()).toBe(false);
    })
    
    test('Ship isSunk() returns true if all cells are hit', () => {
        const newShip = ship(2);
        newShip.hit(0);
        newShip.hit(1);
        expect(newShip.isSunk()).toBe(true);
    })
})