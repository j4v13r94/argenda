<script>
	import {
		getHorarios,
		getHoursFromTime,
		checkTime,
		addMinutes
	} from '../../lib/utils/getHorarios';

	export let hini = '0';
	export let hfin = '23';
	export let horario = { inicio: '08:00', fin: '12:00' };

	let hora = getHorarios(hini, hfin, 15);

	$: hora2 = getHoursFromTime(hora, horario.inicio);

	$: checkTime(horario.inicio, horario.fin) || (horario.fin = addMinutes(horario.inicio));
</script>

<span class="flex w-44 justify-around">
	<label class="label flex flex-col">
		<span>Inicio</span>
		<select class="select w-fit" bind:value={horario.inicio}>
			{#each hora as h}
				<option value={h}>{h}</option>
			{/each}
		</select>
	</label>

	<label class="label flex flex-col">
		<span>Fin</span>
		<select class="select w-20" bind:value={horario.fin}>
			{#each hora2 as h}
				<option value={h}>{h}</option>
			{/each}
		</select>
	</label>
</span>
