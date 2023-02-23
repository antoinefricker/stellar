import { Vec2 } from '../geom/coordinates';

export type HexTile = Vec2 & {
	elevation: number;
};

export type HexMap = HexMapOptions & {
	tiles: HexTile[];
};

export type HexMapOptions = {
	columns: number;
	rows: number;
	size: number;
};

export type MapJsonVO = HexMap;
