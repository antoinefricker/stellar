import { IBoardRenderer } from '../IBoardRenderer';
import { board } from '../Board';
import { HexMapUtils } from '../../hex/map/HexMapUtils';
import { MapTile } from './map/MapTile';
import { Map } from './map/Map';
import { pixi } from './pixi';
import { Button } from './ui/Button';

export class PixiBoardRenderer implements IBoardRenderer {
	private _app: pixi.Application;
	private _map: Map;

	initialize(options: unknown): void {
		this._app = new pixi.Application(options as Partial<pixi.IApplicationOptions>);
		document.body.appendChild(this._app.view as HTMLCanvasElement);

		const ticker = pixi.Ticker.shared;
		ticker.autoStart = true;
		ticker.add(() => this._app.renderer.render(this._app.stage));
	}

	resize(width: number, height: number): void {
		this._app.renderer.resize(width, height);
		this._map.resize(width, height);
	}

	renderMap(): void {
		if (!this._map) {
			this._map = new Map();
			this._app.stage.addChild(this._map);
		} else {
			this._map.removeTiles();
		}

		board.hexMap.tiles.forEach((tile) => {
			const zIndex = board.hexMap.columns * tile.y + tile.x;
			this._map.addTile(new MapTile(tile), HexMapUtils.setPosition(board.hexMap, tile), zIndex);
		});

		// eslint-disable-next-line no-console
		console.log(board.hexMap.tiles.length, 'render!');

		this._app.render();
	}

	renderUI(): void {
		const hud = new pixi.Container();
		hud.x = 20;
		hud.y = 20;
		this._app.stage.addChild(hud);

		const loadButton = new Button('load');
		loadButton.eventMode = 'dynamic';
		loadButton.addEventListener('click', async () => {
			const map = await HexMapUtils.loadMap('map1.json');
			if (!map) return;
			board.hexMap = map;
			this.renderMap();
		});
		hud.addChild(loadButton);

		const saveButton = new Button('save');
		saveButton.eventMode = 'dynamic';
		saveButton.x = loadButton.x + loadButton.width + 20;
		saveButton.addEventListener('click', async () => {
			HexMapUtils.saveMap(board.hexMap, 'map1-bis.json');
		});
		hud.addChild(saveButton);

		const generateButton = new Button('generateRandom');
		generateButton.eventMode = 'dynamic';
		generateButton.x = saveButton.x + saveButton.width + 20;
		generateButton.addEventListener('click', () => {
			board.hexMap = HexMapUtils.generateHexMap({
				columns: board.hexMap.columns,
				rows: board.hexMap.rows,
				size: board.hexMap.size,
			});
			this.renderMap();
		});
		hud.addChild(generateButton);
	}

	get app(): pixi.Application {
		return this._app;
	}
}
