import * as PIXI from "pixi.js";
import { IBoardRenderer } from "../IBoardRenderer";
import { board } from "../Board";
import { HexMapUtils } from "../../hex/map/HexMapUtils";
import { MapTile } from "./map/MapTile";
import { Map } from "./map/Map";
import { Vec2 } from "../../hex/geom/coordinates";

const thetaInc = (2 * Math.PI) / 6;

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

  render(): void {
    throw new Error("Method not implemented.");
  }

  renderMap(): void {
    this._map = new Map();
    this._app.stage.addChild(this._map);

    const groundTexture: PIXI.Texture = this._app.renderer.generateTexture(
      this._generateGroundGraphics()
    );

    const pillarTexture: PIXI.Texture = this._app.renderer.generateTexture(
      this._generatePillarGraphics()
    );

    board.hexMap.hexTiles.forEach((hexTile) => {
      const zIndex = board.hexMap.columns * hexTile.y + hexTile.x;
      this._map.addTile(
        new MapTile(hexTile, groundTexture, pillarTexture),
        HexMapUtils.setPosition(board.hexMap, hexTile),
        zIndex
      );
    });
  }

  private _generateGroundGraphics(): PIXI.Graphics {
    const g = new PIXI.Graphics();
    g.lineStyle(2, 0xffffff, 1);
    g.beginFill(0xffffff, 0.5);
    for (let i = 0; i < 6; i++) {
      const theta = thetaInc * (i + 0.5);
      const { x, y } = {
        x: board.hexMap.size * Math.cos(theta),
        y: board.hexMap.size * Math.sin(theta),
      };
      i !== 0 ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.closePath();
    return g;
  }

  private _generatePillarGraphics(): PIXI.Graphics {
    const g = new PIXI.Graphics();
    g.lineStyle(2, 0xffffff, 0.5);
    g.beginFill(0x666666, 1);
    for (let i = 0; i < 6; i++) {
      let { x, y } = this._radialPosition(i);
      y += i <= 2 ? 2 * board.hexMap.size : 0;
      i !== 0 ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.closePath();

    for (let i = 0; i < 6; i++) {
      const { x, y } = this._radialPosition(i);
      i !== 0 ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.closePath();

    let { x: startX, y: startY } = this._radialPosition(1);
    g.moveTo(startX, startY);
    startY += 2 * board.hexMap.size;
    g.lineTo(startX, startY);

    return g;
  }

  private _radialPosition(edge: number): Vec2 {
    const theta = thetaInc * (edge + 0.5);
    return {
      x: board.hexMap.size * Math.cos(theta),
      y: board.hexMap.size * Math.sin(theta),
    };
  }
}
