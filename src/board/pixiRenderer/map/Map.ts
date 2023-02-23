import { board } from '../../Board';
import { Vec2 } from '../../../hex/geom/coordinates';
import { pixi } from '../pixi';

export class Map extends pixi.Container {
	private _maskGfx: pixi.Graphics;
	private _tiles: pixi.Container;

	constructor() {
		super();

		this._tiles = new pixi.Container();
		this._tiles.position.set(-board.hexMap.size, -0.5 * board.hexMap.size);
		this.addChild(this._tiles);

		this._maskGfx = new pixi.Graphics();
		this._maskGfx.beginFill(0x00ff00, 0.25);
		this._maskGfx.drawRect(0, 0, 100, 100);
		this._maskGfx.endFill();
		this.addChild(this._maskGfx);

		this.mask = this._maskGfx;
	}

	public removeTiles(): void {
		this._tiles.removeChildren();
	}

	public addTile(tile: pixi.Container, position: Vec2, zIndex: number): void {
		tile.position.set(position.x, position.y);
		this._tiles.addChildAt(tile, zIndex);
	}

	public resize(width: number, height: number): void {
		this._maskGfx.width = width;
		this._maskGfx.height = height;
	}
}
