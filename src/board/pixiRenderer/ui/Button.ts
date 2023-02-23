import { Vec2 } from '../../../hex/geom/coordinates';
import { pixi } from '../pixi';

export class Button extends pixi.Container {
	private _padding: Vec2 = { x: 8, y: 4 };

	constructor(text: string) {
		super();

		const txt = new pixi.Text(text);
		txt.style = new pixi.TextStyle({
			fontSize: 16,
			fill: 0xffffff,
		});
		txt.x = this._padding.x;
		txt.y = this._padding.y;

		const bg = new pixi.Graphics();
		bg.beginFill(0xb83563, 1);
		bg.drawRect(0, 0, txt.width + 2 * this._padding.x, txt.height + 2 * this._padding.y);
		bg.endFill();

		this.addChild(bg);
		this.addChild(txt);
	}
}
