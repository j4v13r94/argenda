<script>
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll, goto } from '$app/navigation';
	export let empresa;
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	const t = {
		message: 'Información de contacto actualizado.',
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
		} else
			toastStore.trigger({ message: 'Error al actualizar', background: 'variant-glass-error' });
	}
</script>

<div class="w-full flex gap-2 flex-wrap">
	<span class=" w-full p-1 max-w-xs">
		{#if empresa}
			<!-- content here -->
			<form
				method="POST"
				action="?/Contacto"
				on:submit|preventDefault={handleSubmit}
				class="flex flex-col gap-2 w-full"
			>
				<label class="label">
					<span>Whatsapp</span>
					<input
						class="input rounded"
						type="tel"
						name="whatsapp"
						placeholder="5492964....."
						bind:value={empresa.whatsapp}
					/>
				</label>

				<label class="label">
					<span>Instagram</span>
					<input
						class="input"
						type="text"
						name="instagram"
						placeholder="https://www.instagram.com/j4v13r94"
						bind:value={empresa.instagram}
					/>
				</label>

				<label class="label">
					<span>Facebook</span>
					<input
						class="input"
						type="text"
						name="facebook"
						placeholder="https://www.facebook.com/J4v13r51"
						bind:value={empresa.facebook}
					/>
				</label>

				<label class="label">
					<span>Maps</span>
					<input
						class="input"
						type="text"
						name="maps"
						placeholder="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1549.3827321625613!2d-67.68975101815278!3d-53.786936951455274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTPCsDQ3JzE0LjAiUyA2N8KwNDEnMTYuMiJX!5e0!3m2!1ses-419!2sar!4v1694200462718!5m2!1ses-419!2sar"
						bind:value={empresa.maps}
					/>
				</label>
				<button type="submit" class="btn h-fit rounded variant-filled-secondary">Guardar</button>
			</form>
		{/if}
	</span>
	<span class=" min-w-[300px] flex-grow">
		<iframe
			src={empresa?.maps}
			width="100%"
			height="450"
			style="border:0;"
			allowfullscreen=""
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	</span>
</div>

<style>
	input[type='text'] {
		@apply rounded;
	}
</style>
