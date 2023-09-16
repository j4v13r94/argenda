<script>
	export let label;
	export let type = 'text';
	export let name;
	export let bind;
</script>

<label>
	<p>{label}</p>
	<input {type} {name} {bind} />
</label>
