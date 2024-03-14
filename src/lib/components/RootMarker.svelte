<script lang="ts">
	import { PlaygroundConfig } from '$lib/enums/playground.config';
	import { Layer } from 'svelte-canvas';

	const render = ({ context }: { context: CanvasRenderingContext2D }) => {
		context.strokeStyle = PlaygroundConfig.ROOT_MARKER_COLOR;
		context.lineWidth = 2;
		context.beginPath();
		context.arc(2500, 100, PlaygroundConfig.NODE_SIZE - 2, 0, 2 * Math.PI);
		context.closePath();
		context.stroke();

		context.fillStyle = PlaygroundConfig.ROOT_MARKER_COLOR;
		context.font = `bold 18px Jetbrains Mono, monospace`;
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText('Root', 2500, 100);
	};
</script>

<Layer {render} />
