<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';

	const hour = new Date().getHours();
	const isNightTime = hour < 6 || hour > 17;

	const overwriteTheme = browser
		? JSON.parse(localStorage.getItem('overwriteTheme') || 'null')
		: null;

	let darkTheme = isNightTime;

	if (overwriteTheme) {
		if (overwriteTheme.timeStamp > Date.now() - 43200000) {
			darkTheme = overwriteTheme.theme === 'dark';
		}
	}

	const handleThemeSwap = () => {
		if (darkTheme === isNightTime) {
			browser &&
				localStorage.setItem(
					'overwriteTheme',
					JSON.stringify({ theme: darkTheme ? 'light' : 'dark', timeStamp: Date.now() })
				);
		} else {
			browser && localStorage.removeItem('overwriteTheme');
		}
	};
</script>

<div>
	<div class="fixed navbar bg-base-100 shadow-lg z-20 flex-row justify-between items-center top-0">
		<a class="btn btn-ghost text-xl" href="/">ESRS Navigator</a>
		<label class="p-2 flex cursor-pointer gap-2 justify-end">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><circle cx="12" cy="12" r="5" /><path
					d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
				/></svg
			>
			<input
				type="checkbox"
				value="dark"
				class="toggle theme-controller"
				bind:checked={darkTheme}
				on:click={handleThemeSwap}
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg
			>
		</label>
	</div>

	<div>
		<slot />
	</div>
</div>
