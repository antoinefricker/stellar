// @see https://www.redblobgames.com/grids/hexagons/#coordinates-cube
export type Vec2 = {
	x: number;
	y: number;
};

export const MockHexCoords: Vec2 = {
	x: -1,
	y: -1,
};

export type HexCoordsOrFalse = Vec2 | false;
