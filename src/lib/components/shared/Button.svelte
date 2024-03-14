<script lang="ts">
	let {
		type = 'button',
		color = 'primary',
		class: className
	}: { type?: 'button' | 'submit'; color?: Colors; class?: string } = $props();

	type Colors = 'primary' | 'secondary';

	const colors: { [key in Colors]: string } = {
		primary:
			'bg-indigo-600 text-indigo-100 hover:bg-indigo-700 hover:text-indigo-200 focus:ring-indigo-600',
		secondary:
			'bg-slate-600 text-slate-100 hover:bg-slate-700 hover:text-slate-200 focus:ring-slate-600'
	};
</script>

<button
	class="h-fit px-3.5 py-1.5 rounded-md font-semibold cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 ease-in-out {colors[
		color
	]} {className}"
	{type}
	on:click
>
	<slot />
</button>
