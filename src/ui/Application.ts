import { board } from '../board/Board';
import { PixiBoardRenderer } from '../board/pixiRenderer/PixiBoardRenderer';
import { HexMapUtils } from '../hex/map/HexMapUtils';

export class Application {
	constructor() {
		board.generateHexMap({
			columns: 120,
			rows: 50,
			size: 40,
		});
		board.renderer = new PixiBoardRenderer();
		board.renderer.initialize({
			autoStart: true,
			background: 0x666666,
			antialias: true,
		});
		board.renderer.renderMap();

		const resize = () => {
			board.renderer.resize(window.innerWidth, window.innerHeight);
		};

		this.test();

		window.addEventListener('resize', resize);
		resize();
	}

	async test() {
		const map = await HexMapUtils.loadMap('map1.json');
		// eslint-disable-next-line no-console
		console.log(map);
	}
}
