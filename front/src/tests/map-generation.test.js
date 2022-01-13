import { createGrid, createLine, deleteFirstLine } from '../core/functions/map-generation';
import { ContentCaseType } from '../core/global';

test('[createLine]: should add line to grid', () => {
    const grid = [];
    createLine(grid);
    expect(grid).toStrictEqual([
        {
            id: 0,
            cases: [
                {
                    type: ContentCaseType.Empty,
                },
                {
                    type: ContentCaseType.Empty,
                },
                {
                    type: ContentCaseType.Empty,
                },
            ],
        },
    ]);
    for (let i = 0; i < 50; i++) {
        createLine(grid);
    }
    let i = 0;
    for (const line of grid) {
        expect(line.id).toBe(i);
        if (line.id <= 3 || line.id % 2 === 0) {
            expect(line.cases).toStrictEqual([
                {
                    type: ContentCaseType.Empty,
                },
                {
                    type: ContentCaseType.Empty,
                },
                {
                    type: ContentCaseType.Empty,
                },
            ]);
        } else {
            if (line.cases.includes(ContentCaseType.Obstacle)) {
                expect(line.cases.includes(ContentCaseType.Empty)).toBe(true);
            }
        }
        i++;
    }
    expect(grid.length).toBe(51);
});

test('[deleteFirstLine]: should delete first line of grid', () => {
    const grid = [];
    createLine(grid);
    createLine(grid);
    deleteFirstLine(grid);
    expect(grid.length).toBe(1);
});

test('[createGrid]: should create grid with 5 lines', () => {
    const grid = createGrid();
    expect(grid.length).toBe(5);
});
