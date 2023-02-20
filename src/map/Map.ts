import * as PIXI from "pixi.js";
import { HexMap } from "../hex/map/types";

export class Map extends PIXI.Sprite {
  private _hexMap: HexMap;

  constructor(hexMap: HexMap) {
    super();
    this._hexMap = hexMap;
  }

  buildHexGraphics() {
    const thetaInc = (2 * Math.PI) / 6;

    const hexGraphics = new PIXI.Graphics();

    hexGraphics.lineStyle(1, 0xffffff, 1);
    for (let i = 0; i < 6; i++) {
      const theta = thetaInc * (i + 0.5);
      const { x, y } = {
        x: this._hexMap.size * Math.cos(theta),
        y: this._hexMap.size * Math.sin(theta),
      };
      i === 0 ? hexGraphics.moveTo(x, y) : hexGraphics.lineTo(x, y);
    }
    hexGraphics.closePath();

    return hexGraphics;
  }
}
