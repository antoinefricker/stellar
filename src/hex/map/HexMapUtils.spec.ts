import { HexMapUtils } from './HexMapUtils';
import { describe, expect, test } from '@jest/globals';

describe('HexMapUtils', () => {
	test('create the number of tiles corresponding to the map options', () => {
		const mapOptions = {
			columns: 5,
			rows: 10,
		};
		const map = HexMapUtils.createHexMap(mapOptions);
		expect(map.hexTiles.length).toEqual(mapOptions.columns * mapOptions.rows);
	});
});
