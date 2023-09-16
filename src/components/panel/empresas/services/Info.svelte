<script>
	import { onMount } from 'svelte';
	export let info = '';

	let editorInstance = null;

	// Evento personalizado para mantener sincronizados los datos del editor y editorData
	function updateEditorData() {
		if (editorInstance) {
			const newData = editorInstance.getData();
			if (newData !== info) {
				info = newData;
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

				editorInstance.setData(info);
				// Escuchar cambios en el editor y actualizar editorData
				editorInstance.model.document.on('change:data', updateEditorData);
			})
			.catch((error) => {
				console.error(error);
			});
	});
</script>

<main class="w-full max-w-2xl rounded">
	<div id="editor" class="variant-glass-primary" />
</main>
