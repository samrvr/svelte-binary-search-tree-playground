<script lang="ts">
	import { PlaygroundConfig } from '$lib/enums/playground.config';
	import { Layer } from 'svelte-canvas';

	interface Props {
		x: number;
		y: number;
		value: number;
	}

	let { value, x, y }: Props = $props();

	let hovered = $state(false);

	let render = $derived(
		({
			context,
			width,
			height
		}: {
			context: CanvasRenderingContext2D;
			width: number;
			height: number;
		}) => {
			width = PlaygroundConfig.NODE_SIZE * 2;
			height = PlaygroundConfig.NODE_SIZE * 2;
			context.fillStyle = hovered
				? PlaygroundConfig.HOVER_NODE_BG_COLOR
				: PlaygroundConfig.NODE_BG_COLOR;
			context.beginPath();
			context.arc(x, y, PlaygroundConfig.NODE_SIZE, 0, 2 * Math.PI);
			context.closePath();
			context.fill();

			context.font = `25px Jetbrains Mono, monospace`;
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.fillStyle = PlaygroundConfig.NODE_TEXT_COLOR;
			context.fillText(value!.toString(), x, y);
		}
	);

	function onEnter(e: any) {
		hovered = true;
	}

	function onLeave(e: any) {
		hovered = false;
	}

	function onClick() {
		console.log('clicked');
	}
</script>

<Layer {render} on:mouseenter={onEnter} on:mouseleave={onLeave} on:click={onClick} />
