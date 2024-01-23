/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,ts,svelte}'],
	daisyui: {
		themes: [
			{ light: require('daisyui/src/theming/themes')['nord'] },
			{ dark: require('daisyui/src/theming/themes')['night'] }
		]
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
