<script>
	import DayOfWeek from '../../../ui/DayOfWeek.svelte';
	export let empresa;

	import { invalidateAll, goto } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	let error;

	let loader = false;
	const t = {
		message: 'Horarios actualizados correctamente.',
		// Provide any utility or variant background style:
		background: 'variant-glass-success'
	};

	async function handleSubmit(event) {
		loader = true;
		const data = new FormData(this);
		let horarios = JSON.stringify(empresa.horarios);
		data.append('horarios', horarios);
		data.append('ref', empresa.ref);
		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});
		loader = false;
		/** @type {import('@sveltejs/kit').ActionResult} */
		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			toastStore.trigger(t);
			await invalidateAll();
		} else
			toastStore.trigger({ message: 'Error al actualizar', background: 'variant-glass-error' });

		applyAction(result);
	}
</script>

{#if empresa}
	<!-- content here -->
	<form method="POST" action="?/Horarios" on:submit|preventDefault={handleSubmit}>
		<!-- content -->
		<button class="btn rounded variant-filled-secondary space-x-2" disabled={loader}>
			<p>Guardar</p>

			{#if loader}
				<!-- content here -->
				<ProgressRadial
					width="w-6"
					stroke={120}
					meter="stroke-primary-500"
					track="stroke-primary-500/30"
				/>
			{/if}
		</button>
	</form>
	<DayOfWeek bind:horarios={empresa.horarios} />
{/if}
