<script lang="ts">
	import { drawArrow } from '$lib/utils/draw';
	import { Layer } from 'svelte-canvas';

	interface Props {
		x1: number;
		y1: number;
		x2: number;
		y2: number;
		color?: string;
	}

	let { x1, y1, x2, y2, color }: Props = $props();

	const render = ({ context }: { context: CanvasRenderingContext2D }) => {
		if (x1 && y1) {
			drawArrow(context, x1, y1, x2, y2, color);
		}
	};
</script>

<Layer {render} />
