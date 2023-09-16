<script>
	export let empresa = {
		id: 1,
		slug: 'napl',
		nombre: 'mi titutlacion',
		slogan: 'argenda',
		info: 'contenido html <b>hola</b>',
		location: '',
		img: 'https://via.placeholder.com/800x250',
		horarios: '{}',
		ref: 'clm862n630000esgf4ziv9qnf',
		userId: 1,
		creadoEn: '2023-09-06T20:03:07.851Z',
		actualizadoEn: '2023-09-06T20:02:11.265Z'
	};
</script>

<a
	class="card card-hover overflow-hidden w-full max-w-md min-w-[350px]"
	href={`/panel/empresas/${empresa.ref}`}
>
	<header>
		<img src={empresa.img} class="bg-black/50 w-full aspect-[21/9]" alt="Post" />
	</header>
	<div class="p-4 space-y-4">
		<h3 class="h6" data-toc-ignore>{empresa.slug}</h3>
		<h3 class="h3" data-toc-ignore>{empresa.nombre}</h3>
		<article>
			<p>
				<!-- cspell:disable -->
				{@html empresa.info}
				<!-- cspell:enable -->
			</p>
		</article>
	</div>
	<hr class="opacity-50" />
	<footer class="p-4 flex justify-start items-center space-x-4">
		<!-- <Avatar src="https://via.placeholder.com/300x100" width="w-8" /> -->
		<div class="flex-auto flex justify-between items-center">
			<h6 class="font-bold" data-toc-ignore>Editar 🛠️</h6>
			<small>Creado el <b>{new Date(empresa.creadoEn).toLocaleDateString()}</b></small>
		</div>
	</footer>
</a>
