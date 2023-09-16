<script>
	// your script goes here
	import { popup } from '@skeletonlabs/skeleton';
	import DayOfWeek from '../../../../components/ui/DayOfWeek.svelte';

	const popupFocusClick = {
		event: 'focus-click',
		target: 'popupFocusClick',
		placement: 'bottom'
	};
	let slug = 'mi-negocio';
</script>

<label class="label">
	<span>Nombre del Negocio</span>
	<input class="input" type="text" placeholder="Input" />
</label>

<label class="label">
	<span>Slogan</span>
	<input class="input" type="text" placeholder="Input" />
</label>
<label class="label">
	<span>Slug</span>
	<input
		class="input"
		bind:value={slug}
		type="text"
		placeholder="argenda"
		use:popup={popupFocusClick}
	/>
</label>

<div class="card p-4 variant-filled-secondary" data-popup="popupFocusClick">
	<p>Slug : {slug}</p>
	<p>Link para compartir con tus clientes</p>
	<b>www.argenda.com/{slug}</b>
	<div class="arrow variant-filled-secondary" />
</div>

<button class="btn rounded variant-filled-primary"> Crear Negocio </button>

<style>
	input {
		@apply rounded-lg;
	}
</style>
