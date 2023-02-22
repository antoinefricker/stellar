import { HexMapUtils } from '../hex/map/HexMapUtils';
import { HexMap, HexMapOptions } from '../hex/map/types';
import { IBoardRenderer } from './IBoardRenderer';

class Board {
	private _hexMap: HexMap;
	private _renderer: IBoardRenderer;

	constructor() {}

	public get renderer(): IBoardRenderer {
		return this._renderer;
	}

	public set renderer(renderer: IBoardRenderer) {
		this._renderer = renderer;
	}

	buildHexMap(options?: Partial<HexMapOptions>) {
		this._hexMap = HexMapUtils.createHexMap(options);
	}

	public get hexMap(): HexMap {
		return this._hexMap;
	}
}

export const board = new Board();
