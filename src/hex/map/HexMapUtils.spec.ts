import { HexMapUtils } from './HexMapUtils';
import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { HexMap } from './types';

const mockMap = {
	columns: 4,
	rows: 4,
	size: 40,
	tiles: [
		{ x: 0, y: 0, elevation: 0 },
		{ x: 1, y: 0, elevation: 0 },
		{ x: 2, y: 0, elevation: 0 },
		{ x: 3, y: 0, elevation: 0 },
		{ x: 0, y: 1, elevation: 0 },
		{ x: 1, y: 1, elevation: 0 },
		{ x: 2, y: 1, elevation: 0 },
		{ x: 3, y: 1, elevation: 0 },
		{ x: 0, y: 2, elevation: 0 },
		{ x: 1, y: 2, elevation: 0 },
		{ x: 2, y: 2, elevation: 0 },
		{ x: 3, y: 2, elevation: 0 },
		{ x: 0, y: 3, elevation: 0 },
		{ x: 1, y: 3, elevation: 0 },
		{ x: 2, y: 3, elevation: 0 },
		{ x: 3, y: 3, elevation: 4 },
	],
};

describe('HexMapUtils', () => {
	beforeEach(() => {
		global.console = { ...global.console, warn: jest.fn(), error: jest.fn() };
	});
	describe('map generation', () => {
		test('create the number of tiles corresponding to the map options', () => {
			const mapOptions = {
				columns: 5,
				rows: 10,
			};
			const map = HexMapUtils.generateHexMap(mapOptions);
			expect(map.tiles.length).toEqual(mapOptions.columns * mapOptions.rows);
		});
	});
	describe('IO methods', () => {
		beforeEach(() => {
			fetchMock.doMock();

			fetchMock.mockResponse((req: Request) => {
				if (req.url.endsWith('ok.json')) {
					return Promise.resolve(JSON.stringify(mockMap));
				}
				return Promise.reject(null);
			});
		});

		test('load a map from a json file', async () => {
			const loadedMap: HexMap | null = await HexMapUtils.loadMap('ok.json');
			expect(loadedMap).not.toBeNull();
			expect(loadedMap?.columns).toEqual(4);
			expect(loadedMap?.tiles[15]).toEqual({ x: 3, y: 3, elevation: 4 });
		});

		test('return null if json file is missing', async () => {
			const loadedMap: HexMap | null = await HexMapUtils.loadMap('ko.json');
			expect(loadedMap).toBeNull();
		});
	});
});
