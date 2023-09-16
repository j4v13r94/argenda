<script>
	import { afterUpdate, onMount } from 'svelte';
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	export let empresa;
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	let editorInstance = null;
	empresa.info;

	const t = {
		message: 'Actualizados correctamente.<br> Nosotros',
		// Provide any utility or variant background style:
		background: 'variant-glass-success'
	};

	async function handleSubmit(event) {
		const data = new FormData(this);
		data.append('ref', empresa.ref);
		data.append('info', empresa.info);
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

	// Evento personalizado para mantener sincronizados los datos del editor y editorData
	function updateEditorData() {
		if (editorInstance) {
			const newData = editorInstance.getData();
			if (newData !== empresa.info) {
				empresa.info = newData;
			}
		}
	}

	let editorConfig = {
		toolbar: {
			items: [
				'heading',
				'|',
				'fontFamily',
				'fontSize',
				'bold',
				'italic',
				'underline',
				'alignment' // corrected typo "aligment" to "alignment"
			]
		}
	};

	onMount(async () => {
		const { default: DecoupledEditor } = await import(
			'@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor'
		);

		DecoupledEditor.create(document.querySelector('#editor '), editorConfig)
			.then((editor) => {
				editorInstance = editor;

				// Insertar la barra de herramientas antes del área editable.
				editor.ui
					.getEditableElement()
					.parentElement.insertBefore(
						editor.ui.view.toolbar.element,
						editor.ui.getEditableElement()
					);

				editorInstance.setData(empresa.info);
				// Escuchar cambios en el editor y actualizar editorData
				editorInstance.model.document.on('change:data', updateEditorData);
			})
			.catch((error) => {
				console.error(error);
			});
	});

	// afterUpdate(() => {
	// 	// Cuando editorData cambia desde fuera del editor, actualiza el contenido del editor
	// 	if (editorInstance && empresa.info !== editorInstance.getData()) {
	// 		editorInstance.setData(empresa.info);
	// 	}
	// });
</script>

<form action="?/Info" method="post" on:submit|preventDefault={handleSubmit}>
	<button class="btn rounded variant-filled-secondary">Guardar</button>
</form>
<main class="w-full max-w-2xl rounded">
	<div id="editor" class="variant-glass-primary" />
</main>
