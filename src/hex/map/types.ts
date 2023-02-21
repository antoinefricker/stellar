import { Vec2 } from "../geom/coordinates";

export type HexTile = Vec2 & {
  elevation: number;
};

export type HexMap = {
  columns: number;
  rows: number;
  size: number;
  verticalPerspective: number;
  hexTiles: HexTile[];
};

export type HexMapOptions = {
  columns: number;
  rows: number;
  size: number;
  verticalPerspective: number;
};
