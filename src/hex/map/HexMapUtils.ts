import { Vec2 } from '../geom/coordinates';
import { HexMap, HexMapOptions, HexTile, MapJsonVO } from './types';

export class HexMapUtils {
	public static generateHexMap(options?: Partial<HexMapOptions>): HexMap {
		const { columns = 20, rows = 20, size = 40 } = options || {};

		const tiles: HexTile[] = [];
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < columns; x++) {
				tiles.push({
					x,
					y,
					elevation: HexMapUtils.getRandElevation(),
				});
			}
		}
		return { rows, columns, size, tiles };
	}

	public static async loadMap(path: string): Promise<HexMap | null> {
		return fetch(`./data/${path}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				return HexMapUtils.readMap(data);
			})
			.catch((error) => {
				console.error(error);
				return null;
			});
	}

	public static readMap(data: MapJsonVO): HexMap {
		return data as HexMap;
	}

	public static setPosition(map: HexMap, hexTile: HexTile): Vec2 {
		const { x, y } = {
			x: hexTile.x + (hexTile.y % 2 === 0 ? 0 : 0.5),
			y: hexTile.y,
		};
		return {
			x: x * Math.sqrt(3) * map.size,
			y: y * 1.5 * map.size,
		};
	}

	private static getRandElevation(): number {
		const elevation = Math.floor(Math.random() * 15);
		if (elevation < 3) return 0;
		if (elevation < 11) return 1;
		if (elevation < 13) return 2;
		if (elevation < 15) return 3;
		return 4;
	}
}
