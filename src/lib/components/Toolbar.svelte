<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let insertValue: number | undefined = $state();
	const dispatch = createEventDispatcher();

	function insertDispatch(e: any) {
		e.preventDefault();
		if (insertValue !== undefined) {
			dispatch('insert', { value: insertValue });
			insertValue = undefined;
		}
	}
</script>

<div class="absolute bottom-6 left-6 toolbar z-10">
	<form on:submit={insertDispatch}>
		<label class="text-slate-400 mb-1.5 text-sm inline-block" for="insert">Insert tree value</label>
		<div>
			<input
				class="bg-slate-800 border-slate-700 text-slate-200 rounded-md py-1.5 px-1.5 focus:outline-slate-500 focus:ring-indigo-500 focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 w-24 transition-all duration-200 ease-in-out"
				name="insert"
				id="insert"
				bind:value={insertValue}
				type="number"
				step=".01"
				max="1000"
			/>
			<button
				class="bg-indigo-600 text-indigo-100 px-3.5 py-1.5 rounded-md font-semibold cursor-pointer hover:bg-indigo-700 hover:text-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 ease-in-out"
				type="submit">Insert</button
			>
		</div>
	</form>
</div>
