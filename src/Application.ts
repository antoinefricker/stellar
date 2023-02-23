import { board } from './board/Board';
import { PixiBoardRenderer } from './board/pixiRenderer/PixiBoardRenderer';

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
		board.renderer.renderUI();

		const resize = () => {
			board.renderer.resize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', resize);
		resize();
	}
}
