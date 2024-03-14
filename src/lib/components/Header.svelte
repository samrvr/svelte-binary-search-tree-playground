<script lang="ts">
	let showInstructions = $state(true);
</script>

<div class="absolute top-6 left-6 flex flex-col space-y-2 text-slate-400 text-sm">
	<h1 class="md:text-lg text-base font-bold text-slate-200">Binary Search Tree Playground</h1>
	{#if showInstructions}
		<p>
			Click and drag to navigate the canvas
			<br />
			Use scrollwheel to zoom in and out
			<br />
		</p>
		<p>
			<span class="text-emerald-400"><span class="mr-1">🠉</span>Green </span> specifies a higher
			number
			<br />
			<span class="text-indigo-400"><span class="mr-1">🠋</span>Indigo </span> specifies a lower number
		</p>
		<p>
			Use the bottom left input to add nodes
			<br />
			Click on nodes to delete them
		</p>
	{/if}

	<button
		class="w-fit underline hover:cursor-pointer hover:text-slate-300"
		on:click={() => (showInstructions = !showInstructions)}
		>{showInstructions ? 'Hide' : 'Show'} instructions</button
	>
</div>
