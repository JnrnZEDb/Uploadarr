import { Configuration } from '@nuxt/types/';

const config: Configuration = {
	mode: 'spa',
	/*
	 ** Headers of the page
	 */
	head: {
		titleTemplate: `%s - ${process.env.npm_package_name}`,
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || '',
			},
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#fff' },
	/*
	 ** Global CSS
	 */
	css: [],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		{ src: '@plugins/vuetify.ts', mode: 'client' },
		{ src: '@plugins/axiosPlugin.ts', mode: 'client' },
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://typescript.nuxtjs.org/guide/
		[
			'@nuxt/typescript-build',
			{
				typeCheck: {
					memoryLimit: 2048,
					workers: 4,
				},
			},
		],
		// Doc: https://github.com/nuxt-community/eslint-module
		'@nuxtjs/eslint-module',
		// Doc: https://github.com/nuxt-community/stylelint-module
		'@nuxtjs/stylelint-module',
		'@nuxtjs/vuetify',
	],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
	],

	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		// Will allow for debugging in Typescript + Nuxt
		// Doc: https://nordschool.com/enable-vs-code-debugger-for-nuxt-and-typescript/
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		extend(config, { isDev, isClient }) {
			if (isDev) {
				config.devtool = isClient ? 'source-map' : 'inline-source-map';
			}
		},
	},
};

export default config;
