<script>
	import CardEmpresa from './CardEmpresa.svelte';

	export let empresas = ['demo'];
</script>

<div class="flex flex-row justify-center gap-4 mt-5 flex-wrap p-3">
	{#each empresas as empresa}
		<CardEmpresa {empresa} />
	{/each}
</div>
