import { MapGenerationFunctions } from '../core/functions/map-generation';
import { GlobalTypes, Game } from '../core/global';

test('[createLine]: should add line to grid', () => {
    MapGenerationFunctions.createLine();
    expect(Game.grid).toStrictEqual([
        {
            id: 0,
            cases: [
                {
                    type: GlobalTypes.caseTypes.empty,
                },
                {
                    type: GlobalTypes.caseTypes.empty,
                },
                {
                    type: GlobalTypes.caseTypes.empty,
                },
            ],
        },
    ]);
    for (let i = 0; i < 50; i++) {
        MapGenerationFunctions.createLine();
    }
    let i = 0;
    for (const line of Game.grid) {
        expect(line.id).toBe(i);
        if (line.id <= 3 || line.id % 2 === 0) {
            expect(line.cases).toStrictEqual([
                {
                    type: GlobalTypes.caseTypes.empty,
                },
                {
                    type: GlobalTypes.caseTypes.empty,
                },
                {
                    type: GlobalTypes.caseTypes.empty,
                },
            ]);
        } else {
            if (line.cases.includes(GlobalTypes.caseTypes.obstacle)) {
                expect(line.cases.includes(GlobalTypes.caseTypes.empty)).toBe(true);
            }
        }
        i++;
    }
    expect(Game.grid.length).toBe(51);
});

test('[deleteFirstLine]: should delete first line of grid', () => {
    Game.grid = [];
    MapGenerationFunctions.createGrid();
    MapGenerationFunctions.deleteFirstLine();
    expect(Game.grid.length).toBe(4);
});

test('[createGrid]: should create grid with 5 lines', () => {
    Game.grid = [];
    MapGenerationFunctions.createGrid();
    expect(Game.grid.length).toBe(5);
});
