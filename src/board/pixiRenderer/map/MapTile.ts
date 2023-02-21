import * as PIXI from "pixi.js";
import { HexTile } from "../../../hex/map/types";

export class MapTile extends PIXI.Container {
  private _coordsText: PIXI.Text;

  constructor(
    hexTile: HexTile,
    groundTexture: PIXI.Texture,
    pillarTexture: PIXI.Texture
  ) {
    super();

    this.addChild(new PIXI.Sprite(pillarTexture));

    const ground = new PIXI.Sprite(groundTexture);
    ground.tint = [0x0033dd, 0x33dd33, 0x66dd99, 0x666666, 0x66ddff][
      hexTile.elevation
    ];
    this.addChild(ground);

    this._coordsText = new PIXI.Text();
    this._coordsText.style = new PIXI.TextStyle({
      fontSize: 12,
      fill: 0xffffff,
    });
    this._coordsText.text = `[${hexTile.x}:${hexTile.y}] ${hexTile.elevation}`;
    this._coordsText.x = 0.25 * groundTexture.width;
    this._coordsText.y = 0.5 * groundTexture.width;
    this.addChild(this._coordsText);
  }
}

export default MapTile;
