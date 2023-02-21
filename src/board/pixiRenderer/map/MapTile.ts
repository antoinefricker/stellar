import * as PIXI from "pixi.js";
import { Vec2 } from "../../../hex/geom/coordinates";
import { HexTile } from "../../../hex/map/types";
import { board } from "../../Board";

export class MapTile extends PIXI.Container {
  private _coordsText: PIXI.Text;

  constructor(hexTile: HexTile) {
    super();

    const ground = new PIXI.Graphics();
    ground.lineStyle(2, 0xffffff, 0.3);
    ground.beginFill(groundColors[hexTile.elevation], 1);
    for (let i = 0; i < 6; i++) {
      let { x, y } = radialPosition(i);
      i !== 0 ? ground.lineTo(x, y) : ground.moveTo(x, y);
    }
    ground.closePath();
    this.addChild(ground);

    this._coordsText = new PIXI.Text();
    this._coordsText.style = new PIXI.TextStyle({
      fontSize: 12,
      fill: 0xffffff,
    });
    this._coordsText.text = `[${hexTile.x}:${hexTile.y}] ${hexTile.elevation}`;
    this._coordsText.x = -0.5 * board.hexMap.size;
    this._coordsText.y = -6;
    this.addChild(this._coordsText);
  }
}

const thetaInc = (2 * Math.PI) / 6;
const groundColors = [0x4c89cf, 0x82b972, 0x6b8d61, 0x666666, 0xc1d9df];

const radialPosition = (edge: number): Vec2 => {
  const theta = thetaInc * (edge + 0.5);
  return {
    x: board.hexMap.size * Math.cos(theta),
    y: board.hexMap.size * Math.sin(theta),
  };
};

export default MapTile;
