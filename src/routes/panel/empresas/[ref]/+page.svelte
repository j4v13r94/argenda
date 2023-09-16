<script>
	import { FileButton, TabGroup, Tab, Modal } from '@skeletonlabs/skeleton';
	import EditTitles from '../../../../components/panel/empresas/ref/EditTitles.svelte';
	import EditHorarios from '../../../../components/panel/empresas/ref/EditHorarios.svelte';
	import EditInfo from '../../../../components/panel/empresas/ref/EditInfo.svelte';
	import EditContact from '../../../../components/panel/empresas/ref/EditContact.svelte';
	let tabSet = 0;
	export let data;

	$: empresa = data.empresa;
</script>

<main class="py-5 h-[calc(100%-2rem)]">
	<div class="card max-w-5xl w-full m-auto">
		<!-- componente para subir logo enmpresa -->

		<div
			class="bg-[url('https://via.placeholder.com/1024x300')] w-full max-w-5xl h-80 max-h-80 flex justify-end items-end rounded-t-2xl p-1"
		>
			<FileButton name="files" button="btn rounded variant-soft-primary">Subir 📷</FileButton>
		</div>

		<div class="container">
			<header class="">
				<EditTitles {empresa} />
			</header>
			<article>
				<TabGroup justify="justify-center">
					<Tab bind:group={tabSet} name="tab1" value={0}>
						<svelte:fragment slot="lead">(icon)</svelte:fragment>
						<span>Servicios</span>
					</Tab>
					<Tab bind:group={tabSet} name="tab2" value={1}>Horarios</Tab>
					<Tab bind:group={tabSet} name="tab3" value={2}>Nosotros</Tab>
					<Tab bind:group={tabSet} name="tab3" value={3}>Contacto</Tab>
					<!-- Tab Panels --->
					<svelte:fragment slot="panel">
						<div class="container grid place-items-center p-2 gap-3">
							{#if tabSet === 0}
								<a
									class="rounded btn variant-filled-secondary"
									href={`./${data.empresa.ref}/services/crear`}>Crear Nuevo</a
								>
								working
							{:else if tabSet === 1}
								<EditHorarios {empresa} />
							{:else if tabSet === 2}
								<EditInfo {empresa} />
							{:else if tabSet === 3}
								<EditContact {empresa} />
							{/if}
						</div>
					</svelte:fragment>
				</TabGroup>
			</article>
			<footer class="p-3 mt-3">
				<hr class="" />
				<span class="flex justify-center gap-3 py-3">
					<p class="btn rounded-2xl variant-filled-primary">Facebook</p>
					<p class="btn rounded-2xl variant-filled-tertiary">Insatagram</p>
					<p class="btn rounded-2xl variant-filled-success">Whatsapp</p>
				</span>
			</footer>
		</div>
	</div>
</main>
