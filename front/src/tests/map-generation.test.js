import { createLine } from '../core/functions/map-generation';
import { ContentCaseType } from '../core/global';

test('should add line to grid', () => {
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
    expect(grid.length).toStrictEqual(51);
    expect(grid[0].cases).toStrictEqual([
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
    expect(grid[1].cases).toStrictEqual([
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
    expect(grid[2].cases).toStrictEqual([
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
    expect(grid[3].cases).toStrictEqual([
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
    expect(grid[0].id).toBe(0);
    expect(grid[1].id).toBe(1);
});
