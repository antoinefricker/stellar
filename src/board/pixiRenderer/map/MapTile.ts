import { Vec2 } from '../../../hex/geom/coordinates';
import { HexTile } from '../../../hex/map/types';
import { board } from '../../Board';
import { pixi } from '../pixi';

export class MapTile extends pixi.Container {
	constructor(hexTile: HexTile) {
		super();

		const ground = new pixi.Graphics();
		ground.lineStyle(2, 0xffffff, 0.3);
		ground.beginFill(groundColors[hexTile.elevation], 1);
		for (let i = 0; i < 6; i++) {
			const { x, y } = radialPosition(i);
			i !== 0 ? ground.lineTo(x, y) : ground.moveTo(x, y);
		}
		ground.closePath();
		this.addChild(ground);

		const coordsText = new pixi.Text();
		coordsText.style = new pixi.TextStyle({
			fontSize: 16,
			fill: 0xffffff,
		});
		coordsText.text = `${hexTile.x}:${hexTile.y}`;
		coordsText.x = -0.5 * coordsText.width;
		coordsText.y = -0.5 * coordsText.height;
		this.addChild(coordsText);
	}
}

const thetaInc = (2 * Math.PI) / 6;
const groundColors = [0x4c89cf, 0x82b972, 0x6b8d61, 0x666666, 0xc1d9df];

const radialPosition = (edge: number): Vec2 => {
	const theta = thetaInc * (edge + 0.5);
	return {
		x: board.hexMap.size * Math.cos(theta),
		y: board.hexMap.size * Math.sin(theta),
	};
};

export default MapTile;
