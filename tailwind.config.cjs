/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,ts,svelte}'],
	daisyui: {
		themes: ['light', 'dark', 'nord', 'dark']
	},
	theme: {
		extend: {
			transitionProperty: {
				'max-height': 'max-height'
			}
		}
	},
	plugins: [require('daisyui')]
};
