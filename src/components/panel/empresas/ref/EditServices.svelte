<script>
	import { getToastStore } from '@skeletonlabs/skeleton';
	import DayOfWeek from '../../../ui/DayOfWeek.svelte';
	import { page } from '$app/stores';

	import Info from '../services/Info.svelte';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll, goto } from '$app/navigation';
	let isHorarios = false;
	export let service;

	let url = `/panel/empresas/${$page.params.ref}`;

	const Nav = (dir = '') => {
		goto(url + dir);
	};

	let horarios = JSON.parse(service.horarios || '{}');

	const toastStore = getToastStore();
	let show = false;

	let loader;

	async function handleSubmit(event) {
		loader = true;
		const data = new FormData(this);
		if (service.isHorarios) data.append('horarios', JSON.stringify(horarios));
		if (!service.isHorarios) data.append('horarios', 'null');

		data.append('sref', service.sref);
		data.append('pagos', service.pagos);
		data.append('isHorarios', service.isHorarios);
		data.append('info', service.info);
		data.append('empresaId', service.empresaId);

		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});
		loader = false;
		/** @type {import('@sveltejs/kit').ActionResult} */
		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			toastStore.trigger({ message: 'happy al actualizar', background: 'variant-glass-success' });
			//sref = result.data.sref;
			await invalidateAll();
		} else
			toastStore.trigger({ message: 'Error al actualizar', background: 'variant-glass-error' });

		applyAction(result);
	}
</script>

<span class="flex gap-4 justify-center">
	<a class="rounded btn variant-filled-secondary" href={url}>Volver</a>
	<a class="rounded btn variant-filled-secondary" href={url + '/services/crear'}>Crear Nuevo</a>
</span>

<form
	action="?/Service"
	method="post"
	on:submit|preventDefault={handleSubmit}
	class="flex flex-col gap-2"
>
	<label>
		<p>Nombre del Servicio *</p>
		<input type="text" name="titulo" required bind:value={service.titulo} />
	</label>

	<label for="">
		<p>Descripción</p>
		<Info bind:info={service.info} />
	</label>

	<label class="check">
		<p>Pedir Adelanto</p>
		<input type="checkbox" name="pagos" bind:checked={service.pagos} />
	</label>
	{#if service.pagos}
		<!-- content here -->
		<label>
			<p>Alias</p>
			<input type="text" name="alias" placeholder="Alias" bind:value={service.alias} />
		</label>
		<label>
			<p>Precio de reserva</p>
			<input
				type="number"
				name="reserva"
				placeholder="Precio de reserva"
				bind:value={service.reserva}
			/>
		</label>
	{/if}
	<label>
		<p>Precio *</p>
		<input type="number" name="precio" placeholder="Precio" required bind:value={service.precio} />
	</label>

	<label>
		<p>Duración para el cliente</p>
		<input type="number" name="timeC" placeholder="En minutos EJ : 30" bind:value={service.timeC} />
	</label>
	<label>
		<p>Duración en agenda *</p>
		<input
			type="number"
			name="time"
			placeholder="Tiempo en agenda"
			required
			bind:value={service.time}
		/>
	</label>

	<label class="check">
		<p>Horario especial</p>
		<input type="checkbox" name="isHorarios" bind:checked={service.isHorarios} />
	</label>
	{#if service.isHorarios}
		<DayOfWeek bind:horarios />
	{/if}

	<button class="btn rounded variant-filled-secondary">{service.sref ? 'Editar' : 'Crear'}</button>
</form>

<style>
	input[type='number'],
	input[type='text'] {
		@apply rounded input;
	}
	input[type='checkbox'] {
		@apply rounded checkbox;
	}
	label {
		@apply label flex  flex-col gap-2;
	}

	.check {
		@apply flex-row;
	}
</style>
