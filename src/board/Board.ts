import { HexMapUtils } from '../hex/map/HexMapUtils';
import { HexMap, HexMapOptions } from '../hex/map/types';
import { IBoardRenderer } from './IBoardRenderer';

class Board {
	private _hexMap: HexMap;
	private _renderer: IBoardRenderer;

	constructor(renderer?: IBoardRenderer, mapOptions?: Partial<HexMapOptions>) {
		if (renderer) this.renderer = renderer;
		if (mapOptions) this.generateHexMap(mapOptions);
	}

	public get renderer(): IBoardRenderer {
		return this._renderer;
	}

	public set renderer(renderer: IBoardRenderer) {
		this._renderer = renderer;
	}

	public set hexMap(hexMap: HexMap) {
		this._hexMap = hexMap;
	}

	public get hexMap(): HexMap {
		return this._hexMap;
	}

	generateHexMap(options?: Partial<HexMapOptions>) {
		this.hexMap = HexMapUtils.generateHexMap(options);
	}
}

export const board = new Board();
