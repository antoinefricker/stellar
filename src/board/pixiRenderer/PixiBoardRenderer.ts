import * as PIXI from "pixi.js";
import { IBoardRenderer } from "../IBoardRenderer";
import { board } from "../Board";
import { HexMapUtils } from "../../hex/map/HexMapUtils";
import { MapTile } from "./map/MapTile";
import { Map } from "./map/Map";

export class PixiBoardRenderer implements IBoardRenderer {
  private _app: PIXI.Application;
  private _map: Map;

  initialize(options: unknown): void {
    this._app = new PIXI.Application(
      options as Partial<PIXI.IApplicationOptions>
    );
    document.body.appendChild(this._app.view as HTMLCanvasElement);
  }

  resize(width: number, height: number): void {
    this._app.renderer.resize(width, height);
    this._map.resize(width, height);
  }

  renderMap(): void {
    this._map = new Map();
    this._app.stage.addChild(this._map);

    board.hexMap.hexTiles.forEach((hexTile) => {
      const zIndex = board.hexMap.columns * hexTile.y + hexTile.x;
      this._map.addTile(
        new MapTile(hexTile),
        HexMapUtils.setPosition(board.hexMap, hexTile),
        zIndex
      );
    });
  }

  get app(): PIXI.Application {
    return this._app;
  }
}
