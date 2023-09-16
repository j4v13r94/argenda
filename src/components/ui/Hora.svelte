<script>
	import { addMinutes, checkTime } from '../../lib/utils/getHorarios';
	import SelectorHora from './SelectorHora.svelte';
	export let props = { id: 1, day: 'Lunes', isClose: false };
	export let datos;

	$: h1 = { inicio: '08:00', fin: '12:00' };
	$: h2 = { inicio: '15:00', fin: '20:00' };

	let isOpen = props?.isClose ? false : true;
	let isDos = false;

	$: if (isDos) {
		checkTime(h1.fin, h2.inicio) || (h2.inicio = addMinutes(h1.fin));
	}

	$: datos = isOpen ? (isDos ? { isOpen, h1, h2 } : { isOpen, h1 }) : { isOpen };
</script>

<div class="card p-4 h-fit w-fit">
	<span class="flex flex-col w-full gap-3">
		<span class="flex justify-around">
			<label class="label flex gap-2">
				<p>{props.day}</p>
				<input class="checkbox" type="checkbox" bind:checked={isOpen} />
			</label>

			<label class="label flex gap-2">
				<p>2 Horarios</p>
				<input class="checkbox" type="checkbox" bind:checked={isDos} />
			</label>
		</span>

		<SelectorHora bind:horario={h1} />
		{#if isDos}
			{#key h1.fin}
				<SelectorHora bind:horario={h2} hini={addMinutes(h1.fin)} />
			{/key}
		{/if}
	</span>
</div>
