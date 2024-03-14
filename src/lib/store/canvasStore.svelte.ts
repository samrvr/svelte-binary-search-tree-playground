import type { Canvas } from 'svelte-canvas';

export const createCanvasStore = () => {
	let canvas: Canvas | undefined = $state();

	return {
		get canvas() {
			return canvas;
		},
		set canvas(c) {
			canvas = c;
		}
	};
};

export const canvasStore = createCanvasStore();
