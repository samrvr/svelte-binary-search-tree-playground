<script lang="ts">
	let { type = 'button' }: { type: 'button' | 'submit' } = $props();
</script>

<button
	class="bg-indigo-600 text-indigo-100 px-3.5 py-1.5 rounded-md font-semibold cursor-pointer hover:bg-indigo-700 hover:text-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 ease-in-out"
	{type}
>
	<slot />
</button>
