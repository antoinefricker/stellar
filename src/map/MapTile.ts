import * as PIXI from "pixi.js";
import { HexTile } from "../hex/map/types";

export class MapTile extends PIXI.Sprite {
  private _coordsText: PIXI.Text;

  constructor(hexTile: HexTile, texture: PIXI.Texture) {
    super(texture);

    this._coordsText = new PIXI.Text();
    this._coordsText.style = new PIXI.TextStyle({
      fontSize: 11,
      fill: 0xffffff,
    });
    this._coordsText.text = `[${hexTile.x.toString()}:${hexTile.x.toString()}]`;
    this._coordsText.x = 0.25 * texture.width;
    this._coordsText.y = 0.5 * texture.width;
    this.addChild(this._coordsText);
  }
}

export default MapTile;
