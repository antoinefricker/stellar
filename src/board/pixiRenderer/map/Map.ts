import * as PIXI from "pixi.js";
import { board } from "../../Board";
import { HexTile } from "../../../hex/map/types";
import { Vec2 } from "../../../hex/geom/coordinates";

export class Map extends PIXI.Container {
  private _maskGfx: PIXI.Graphics;
  private _tiles: PIXI.Container;

  constructor() {
    super();

    this._tiles = new PIXI.Container();
    this._tiles.position.set(-board.hexMap.size, -0.5 * board.hexMap.size);
    this.addChild(this._tiles);

    this._maskGfx = new PIXI.Graphics();
    this._maskGfx.beginFill(0x00ff00, 0.25);
    this._maskGfx.drawRect(0, 0, 100, 100);
    this._maskGfx.endFill();
    this.addChild(this._maskGfx);

    this.mask = this._maskGfx;
  }

  public addTile(
    tile: PIXI.Container,
    position: Vec2,
    hexTile: HexTile,
    zIndex: number
  ): void {
    tile.position.set(position.x, position.y - hexTile.elevation * 8);
    this._tiles.addChildAt(tile, zIndex);
  }

  public resize(width: number, height: number): void {
    this._maskGfx.width = width;
    this._maskGfx.height = height;
  }
}
