import {HexCoords, HexCoordsOrFalse, MockHexCoords} from './coordinates';
import {HexDirection} from './directions';

export class HexGeomUtils {
    public static getNeighbor (_hex: HexCoords, _direction: HexDirection): HexCoords {
        return MockHexCoords;
    };
    public static getNeighbors (_hex: HexCoords, _direction: HexDirection[], _distance:number): HexCoords[] {
        return [];
    };

    public static move (_hex: HexCoords, _direction: HexDirection, _distance:number): HexCoordsOrFalse {
        return MockHexCoords;
    };
    public distance (_hex1: HexCoords, _hex2: HexCoords): number {
        return 0;
    };
}