<script>
	export let data;

	import EditServices from '../../../../../../components/panel/empresas/ref/EditServices.svelte';
</script>

<EditServices bind:service={data.service} />
