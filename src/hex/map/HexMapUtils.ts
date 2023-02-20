import { Vec2 } from "../geom/coordinates";
import { HexMap, HexMapOptions, HexTile } from "./types";

export class HexMapUtils{

    public static createHexMap(options:HexMapOptions): HexMap
    {
        const {columns, rows, size = 40} = options;
        let hexTiles: HexTile[] = [];
        for(let x = 0; x < columns; x++){
            for(let y = 0; y < rows; y++){
                hexTiles.push({
                    x: x,
                    y: y,
                    elevation: 0,
                });
            } 
        }
        return {rows, columns, size, hexTiles};
    }

    public static setPosition(map: HexMap, hexTile: HexTile): Vec2 {
        const {x, y} = {
            x: hexTile.x + (hexTile.y % 2 === 0 ? 0 : 0.5),
            y: hexTile.y,
        }
        return {
            x: x * Math.sqrt(3) * map.size,
            y: y * 1.5 * map.size,
        }
    }

}