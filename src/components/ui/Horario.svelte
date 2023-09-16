<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let hora = {
		h1: { inicio: '08:00', fin: '12:00' },
		h2: { inicio: '15:00', fin: '20:00' }
	};

	let horaInicio = '';
	let horaFin = '';

	function agregarHorario() {
		if (horaInicio && horaFin && horaFin > horaInicio) {
			const nuevoHorario = {
				inicio: horaInicio,
				fin: horaFin
			};
			hora[`h${Object.keys(hora).length + 1}`] = nuevoHorario;
			horaInicio = '';
			horaFin = '';
			dispatch('horarioActualizado', hora);
		}
	}
</script>

<div>
	<h3>Horarios:</h3>
	{#each Object.entries(hora) as [key, value]}
		<p>{key}: {value.inicio} - {value.fin}</p>
	{/each}

	<div>
		<label for="horaInicio">Hora de inicio:</label>
		<input type="time" id="horaInicio" bind:value={horaInicio} />

		<label for="horaFin">Hora de fin:</label>
		<input type="time" id="horaFin" bind:value={horaFin} />

		<button on:click={agregarHorario}>Agregar Horario</button>
	</div>
</div>
