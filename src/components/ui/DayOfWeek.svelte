<script>
	import HoraSelectora from './HoraSelectora.svelte';

	const dias = [
		{ dia: 'Lunes', id: 1 },
		{ dia: 'Martes', id: 2 },
		{ dia: 'Miércoles', id: 3 },
		{ dia: 'Jueves', id: 4 },
		{ dia: 'Viernes', id: 5 },
		{ dia: 'Sábado', id: 6 },
		{ dia: 'Domingo', id: 0 }
	];

	export let horarios = {};
</script>

<div class="flex gap-2 flex-wrap justify-center">
	{#each dias as dia}
		<HoraSelectora bind:horario={horarios[dia.id]} etiqueta={dia.dia} />
	{/each}
</div>
