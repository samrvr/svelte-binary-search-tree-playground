<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import Panzoom, { type PanzoomObject } from '@panzoom/panzoom';
	import NodeParent from '$lib/components/NodeParent.svelte';
	import { tree } from '$lib/store/bstStore.svelte';
	import { Canvas } from 'svelte-canvas';
	import { onMount } from 'svelte';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import Header from '$lib/components/Header.svelte';

	let canvas: Canvas;
	let canvasContainer: HTMLDivElement;
	let panzoom: PanzoomObject;

	onMount(() => {
		panzoom = Panzoom(canvas.getCanvas(), {
			contain: 'outside',
			canvas: true,
			minScale: 0.5,
			maxScale: 2,
			startX: 1,
			startY: 100,
			excludeClass: 'toolbar'
		});
		canvasContainer.addEventListener('wheel', panzoom.zoomWithWheel);
		canvas.redraw();
	});

	tree.insert(10);

	function insert(e: CustomEvent<{ value: number }>) {
		tree.insert(e.detail.value);
	}
</script>

<div class="h-screen w-screen overflow-hidden relative bg-slate-900" bind:this={canvasContainer}>
	<Canvas pixelRatio={2} bind:this={canvas} width={5000} height={3000} layerEvents>
		<Grid />
		{#if tree.root}
			<NodeParent x={100} y={100} depth={0} node={tree.root} side={null} />
		{/if}
	</Canvas>

	<Header />
	<Toolbar on:insert={insert} />
</div>
