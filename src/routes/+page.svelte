<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import Panzoom, { type PanzoomObject } from '@panzoom/panzoom';
	import NodeParent from '$lib/components/NodeParent.svelte';
	import { tree } from '$lib/store/bstStore.svelte';
	import { Canvas } from 'svelte-canvas';
	import { onMount, tick } from 'svelte';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import Header from '$lib/components/Header.svelte';
	import { canvasStore } from '$lib/store/canvasStore.svelte';
	import RootMarker from '$lib/components/RootMarker.svelte';

	let canvas: Canvas;
	let canvasContainer: HTMLDivElement;
	let panzoom: PanzoomObject;

	onMount(() => {
		panzoom = Panzoom(canvas.getCanvas(), {
			contain: 'outside',
			canvas: true,
			minScale: 0.5,
			maxScale: 1.5,
			startX: -2500 + window.innerWidth / 2,
			excludeClass: 'toolbar'
		});
		canvasContainer.addEventListener('wheel', panzoom.zoomWithWheel);
		canvas.redraw();

		return () => {
			canvasContainer.removeEventListener('wheel', panzoom.zoomWithWheel);
		};
	});

	function insert(e: CustomEvent<{ value: number }>) {
		tree.insert(e.detail.value);
	}

	function goToRoot() {
		panzoom.zoom(1);
		panzoom.pan(-2500 + window.innerWidth / 2, 0);
	}
</script>

<svelte:head>
	<title>Binary Search Tree Playground</title>
	<meta name="description" content="Visualize binary search trees with ease." />
</svelte:head>

<div class="h-[100dvh] w-screen overflow-hidden relative bg-slate-900" bind:this={canvasContainer}>
	<Canvas pixelRatio={1.5} bind:this={canvas} width={5000} height={3000} layerEvents>
		<Grid />
		<RootMarker />
		{#if tree.root}
			<NodeParent x={100} y={100} depth={0} node={tree.root} side={null} />
		{/if}
	</Canvas>

	<Header />
	<Toolbar on:insert={insert} on:goToRoot={goToRoot} />
</div>
