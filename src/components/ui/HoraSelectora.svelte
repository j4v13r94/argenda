<script>
	import { addMinutes, checkTime } from '../../lib/utils/getHorarios';

	export let horario = {
		isOpen: true,
		isDos: false,
		h1: {
			inicio: '08:00',
			fin: '12:00'
		},
		h2: {
			inicio: '15:00',
			fin: '20:00'
		}
	};

	export let etiqueta = 'Lunes';
	$: {
		const { h1, h2 } = horario;
		checkTime(h1.inicio, h1.fin) || (h1.fin = addMinutes(h1.inicio));
		checkTime(h1.fin, h2.inicio) || (h2.inicio = addMinutes(h1.fin));
		checkTime(h2.inicio, h2.fin) || (h2.fin = addMinutes(h2.inicio));
	}
</script>

<div class="card w-fit h-fit p-3 min-w-[135px]">
	<div class="flex flex-col gap-2">
		<label class="opciones">
			<span>{etiqueta}</span>
			<input type="checkbox" bind:checked={horario.isOpen} class="checkbox" />
		</label>

		{#if horario.isOpen}
			<!-- content here -->

			<input type="time" bind:value={horario.h1.inicio} step="900" />
			<input type="time" bind:value={horario.h1.fin} step="900" />
			<label class="opciones">
				<span>Agregar 🕒</span>
				<input type="checkbox" bind:checked={horario.isDos} class="checkbox" />
			</label>

			{#if horario.isDos}
				<!-- content here -->
				<input type="time" bind:value={horario.h2.inicio} step="900" />
				<input type="time" bind:value={horario.h2.fin} step="900" />
			{/if}
		{/if}
	</div>
</div>

<style>
	.opciones {
		@apply flex justify-end gap-2 items-center;
	}
	input[type='time'] {
		@apply time rounded;
	}
</style>
