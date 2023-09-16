<script>
	import '../app.postcss';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';

	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { signIn, signOut } from '@auth/sveltekit/client';

	import { page } from '$app/stores';

	const User = $page.data.session?.user;

	export const Login = () => {
		signIn('google');
	};
</script>

<Toast />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->

		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">(icon)</svelte:fragment>

			<svelte:fragment slot="trail">
				<!-- content here -->

				{#if User}
					<button class="btn variant-outline-warning rounded font-bold" on:click={signOut}>
						Mi Panel
					</button>
				{:else}
					<!-- else content here -->
					<button class="btn variant-glass-primary rounded" on:click={Login}> Ingresar </button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
