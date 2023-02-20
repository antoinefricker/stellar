import * as PIXI from "pixi.js";
import { HexMapUtils } from "../hex/map/HexMapUtils";
import { HexMap } from "../hex/map/types";
import type { HexMapOptions } from "../hex/map/types";
import { MapTile } from "../map/MapTile";
import { Map } from "../map/Map";

export class PixiApplication {
  private _app: PIXI.Application;
  private _hexMap: HexMap;
  private _map: Map | null = null;

  constructor(options: HexMapOptions) {
    this._app = new PIXI.Application({
      autoStart: true,
      background: 0x666666,
      antialias: true,
    });
    document.body.appendChild(this._app.view as HTMLCanvasElement);

    this._hexMap = HexMapUtils.createHexMap(options);
    this.build();

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  public get hexMap(): HexMap {
    return this._hexMap;
  }

  public build() {
    this._map = new Map(this.hexMap);
    this._app.stage.addChild(this._map);

    const hexTexture: PIXI.Texture = this._app.renderer.generateTexture(
      this._map.buildHexGraphics()
    );

    this._hexMap.hexTiles.forEach((hexTile) => {
      const { x, y } = HexMapUtils.setPosition(this.hexMap, hexTile);
      const tile = new MapTile(hexTile, hexTexture);
      tile.position.set(x, y);
      (this._map as Map).addChild(tile);
    });
  }

  private resize() {
    this._app.renderer.resize(window.innerWidth, window.innerHeight);
  }
}
