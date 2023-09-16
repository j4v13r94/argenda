<script>
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll, goto } from '$app/navigation';
	export let empresa;
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	const t = {
		message: 'Actualizados correctamente.<br>[Titulo,Slug,Slogan]',
		// Provide any utility or variant background style:
		background: 'variant-glass-success'
	};

	async function handleSubmit(event) {
		const data = new FormData(this);
		data.append('ref', empresa.ref);
		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			toastStore.trigger(t);
			await invalidateAll();
		}
	}
</script>

{#if empresa}
	<!-- content here -->
	<form
		method="POST"
		action="?/Titulos"
		on:submit|preventDefault={handleSubmit}
		class="p-3 flex gap-2 flex-wrap justify-center items-end"
	>
		<label class="label">
			<span>Titulo</span>
			<input
				class="input"
				type="text"
				name="nombre"
				placeholder="Titulo"
				bind:value={empresa.nombre}
			/>
		</label>

		<label class="label">
			<span>Slogan</span>
			<input
				class="input"
				type="text"
				name="slogan"
				placeholder="slogan"
				bind:value={empresa.slogan}
			/>
		</label>

		<label class="label">
			<span>Slug</span>
			<input class="input" type="text" name="slug" placeholder="Slug" bind:value={empresa.slug} />
		</label>
		<button type="submit" class="btn h-fit rounded variant-outline-secondary">Guardar</button>
	</form>
{/if}

<style>
	input[type='text'] {
		@apply rounded;
	}
</style>
