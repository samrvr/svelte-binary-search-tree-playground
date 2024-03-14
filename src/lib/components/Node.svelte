<script lang="ts">
	import { PlaygroundConfig } from '$lib/enums/playground.config';
	import { tree } from '$lib/store/bstStore.svelte';
	import { canvasStore } from '$lib/store/canvasStore.svelte';
	import { Layer } from 'svelte-canvas';

	interface Props {
		x: number;
		y: number;
		value: number;
	}

	let { value, x, y }: Props = $props();

	let hovered = $state(false);

	let render =
		() =>
		({ context }: { context: CanvasRenderingContext2D }) => {
			// context.fillStyle = hovered
			// 	? PlaygroundConfig.HOVER_NODE_BG_COLOR
			// 	: PlaygroundConfig.NODE_BG_COLOR;
			context.fillStyle = PlaygroundConfig.NODE_BG_COLOR;
			context.beginPath();
			context.arc(x, y, PlaygroundConfig.NODE_SIZE, 0, 2 * Math.PI);
			context.closePath();
			context.fill();

			context.font = `25px Jetbrains Mono, monospace`;
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.fillStyle = PlaygroundConfig.NODE_TEXT_COLOR;
			context.fillText(value!.toString(), x, y);
		};

	function onEnter() {
		hovered = true;
		document.querySelector('canvas')!.style.cursor = 'pointer';
	}

	function onLeave() {
		hovered = false;
		document.querySelector('canvas')!.style.cursor = 'unset';
	}

	function onClick() {
		tree.remove(value);
	}
</script>

<Layer {render} on:mouseenter={onEnter} on:mouseleave={onLeave} on:click={onClick} />
