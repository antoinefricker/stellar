import { Vec2 } from "../geom/coordinates";
import { HexMap, HexMapOptions, HexTile } from "./types";

export class HexMapUtils {
  public static createHexMap(options?: Partial<HexMapOptions>): HexMap {
    const {
      columns = 20,
      rows = 20,
      size = 40,
      verticalPerspective = 0.6,
    } = options || {};

    let hexTiles: HexTile[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const elevation = Math.floor(Math.random() * 15);
        hexTiles.push({
          x: x,
          y: y,
          elevation:
            elevation > 3
              ? elevation > 11
                ? elevation > 13
                  ? elevation > 15
                    ? 4
                    : 3
                  : 2
                : 1
              : 0,
        });
      }
    }
    return { rows, columns, size, verticalPerspective, hexTiles };
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
}
