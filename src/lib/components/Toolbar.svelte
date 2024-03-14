<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './shared/Button.svelte';

	let insertValue: number | undefined = $state();
	const dispatch = createEventDispatcher();

	function insertDispatch(e: any) {
		e.preventDefault();
		if (insertValue !== undefined) {
			dispatch('insert', { value: insertValue });
			insertValue = undefined;
		}
	}

	function rootDispatch(e: any) {
		e.preventDefault();
		dispatch('goToRoot');
	}
</script>

<div class="absolute bottom-6 left-6 toolbar z-10 flex items-end">
	<form on:submit={insertDispatch}>
		<label class="text-slate-400 mb-1.5 text-sm inline-block" for="insert">Insert tree value</label>
		<div>
			<input
				class="bg-slate-800 border-slate-700 text-slate-200 rounded-md py-1.5 px-1.5 focus:outline-slate-500 focus:ring-indigo-600 focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 w-24 transition-all duration-200 ease-in-out"
				name="insert"
				id="insert"
				bind:value={insertValue}
				type="number"
				step=".01"
				max="1000"
			/>
			<Button type="submit">Insert</Button>
			<Button color="secondary" on:click={rootDispatch}>Center Root</Button>
		</div>
	</form>
</div>
