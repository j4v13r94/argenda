<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<!-- <script>
	import Hora from '../components/ui/Hora.svelte';

	const daysOfWeek = [
		{ id: 1, day: 'Lun' },
		{ id: 2, day: 'Mar' },
		{ id: 3, day: 'Mié' },
		{ id: 4, day: 'Jue' },
		{ id: 5, day: 'Vie' },
		{ id: 6, day: 'Sáb' },
		{ id: 0, day: 'Dom', isClose: true }
	];

	let horarios = {};

	$: console.log(horarios);
</script>

<div class="flex gap-2 flex-wrap justify-center max-w-3xl">
	{#each daysOfWeek as props}
		<Hora bind:datos={horarios[props.id]} {props} />
	{/each}
</div> -->

<script>
	import DayOfWeek from '../components/ui/DayOfWeek.svelte';

	let horarios = {
		0: {
			isOpen: false,
			isDos: false,
			h1: { inicio: '08:00', fin: '12:00' },
			h2: { inicio: '15:00', fin: '20:00' }
		}
	};
</script>

<DayOfWeek bind:horarios />
