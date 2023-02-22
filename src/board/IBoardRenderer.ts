export interface IBoardRenderer {
	initialize(options: unknown): void;
	resize(width: number, height: number): void;
	renderMap(): void;
}
