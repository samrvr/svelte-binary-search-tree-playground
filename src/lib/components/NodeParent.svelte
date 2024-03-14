<script lang="ts">
	import type { BSTNode } from '$lib/classes/bst.svelte.js';
	import Node from './Node.svelte';
	import Arrow from './Arrow.svelte';
	import { tree } from '$lib/store/bstStore.svelte';
	import { PlaygroundConfig } from '$lib/enums/playground.config';

	interface Props {
		node: BSTNode;
		x: number;
		y: number;
		depth: number;
		side: 'left' | 'right' | null;
	}

	let { node, depth, side }: Props = $props();

	let leftNode: any = $state();
	let rightNode: any = $state();

	let nodesLeft = $derived(tree.getNodesAtDepthLeft(depth - 1));
	let nodesRight = $derived(tree.getNodesAtDepthRight(depth - 1));
	let nodePos = $derived.by(() => {
		if (side === 'left') {
			return -nodesLeft.length + nodesLeft.indexOf(node);
		} else if (side === 'right') {
			return nodesRight.indexOf(node) + 1;
		} else {
			return 0;
		}
	});

	export const x = $derived.by(() => {
		const nodeShift = side === 'left' ? 100 : side === 'right' ? -100 : 0;
		return 2500 + (Math.abs(nodePos) === 1 ? nodePos * 100 : nodePos * 200 + nodeShift);
	});
	export const y = $derived(100 + depth * 200);
</script>

<!-- Parent node -->
<Node {x} {y} value={node.value} />
{#if node.left}
	<Arrow
		x1={x}
		y1={y}
		x2={leftNode?.x}
		y2={leftNode?.y}
		color={PlaygroundConfig.LEFT_ARROW_COLOR.toString()}
	/>
	<svelte:self
		bind:this={leftNode}
		depth={depth + 1}
		side={depth === 0 ? 'left' : side}
		node={node.left}
	/>
{/if}
{#if node.right}
	<Arrow
		x1={x}
		y1={y}
		x2={rightNode?.x}
		y2={rightNode?.y}
		color={PlaygroundConfig.RIGHT_ARROW_COLOR.toString()}
	/>
	<svelte:self
		bind:this={rightNode}
		depth={depth + 1}
		side={depth === 0 ? 'right' : side}
		node={node.right}
	/>
{/if}
