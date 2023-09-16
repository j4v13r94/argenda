<script>
	import Listempresas from '../../../components/panel/empresas/Listempresas.svelte';

	export let data;
</script>

<Listempresas empresas={data.empresas} />
