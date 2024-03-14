<script lang="ts">
	import { PlaygroundConfig } from '$lib/enums/playground.config';
	import { Layer } from 'svelte-canvas';

	const gridSpacing = 20;

	const render = ({
		context,
		width,
		height
	}: {
		context: CanvasRenderingContext2D;
		width: number;
		height: number;
	}) => {
		context.fillStyle = PlaygroundConfig.GRID_DOT_COLOR;
		for (let i = 0; i < width; i += gridSpacing) {
			for (let j = 0; j < height; j += gridSpacing) {
				context.beginPath();
				context.arc(i, j, 1.5, 0, 2 * Math.PI); // Draw a small circle at (i, j)
				context.fill();
			}
		}
	};
</script>

<Layer {render} />
