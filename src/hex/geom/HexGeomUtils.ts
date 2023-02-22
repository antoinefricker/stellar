import { Vec2, HexCoordsOrFalse, MockHexCoords } from './coordinates';
import { HexDirection } from './directions';

export class HexGeomUtils {
	public static getNeighbor(_hex: Vec2, _direction: HexDirection): Vec2 {
		return MockHexCoords;
	}
	public static getNeighbors(_hex: Vec2, _direction: HexDirection[], _distance: number): Vec2[] {
		return [];
	}

	public static move(_hex: Vec2, _direction: HexDirection, _distance: number): HexCoordsOrFalse {
		return MockHexCoords;
	}
	public distance(_hex1: Vec2, _hex2: Vec2): number {
		return 0;
	}
}
