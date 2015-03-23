'use strict';

module.exports = {
	api: '/api/v1',
	images: 'images/',
	angularRoutes: [
		'/welcome'
	],
	seeds: {
		user: {
			seed: process.env.USER_SEEDS || 5000
		}
	},
	CORE_HOST: (process.env.CORE_HOST || 'mod.it'),
	API_HOST: (process.env.API_HOST || 'localhost'),
	TARGET_VERSION: (process.env.TARGET_VERSION || 1),
	app: {
		title: 'Modit Administrator',
		description: 'Manages Modit users and activities',
		keywords: 'Modit, Deployment, Staging, Docker'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/c3/c3.css',
				'public/lib/angular-chart.js/dist/angular-chart.css', 
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/ngtoast/dist/ngToast.js', 
				'public/lib/moment/moment.js', 
				'public/lib/c3/c3.js', 
				'public/lib/d3/d3.js', 
				'public/lib/Chart.js/Chart.js',
				'public/lib/angular-chart.js/dist/angular-chart.js', 
				'public/lib/pluralize/pluralize.js', 
			]
		},
		css: [
			//'public/lib/c3/c3.css',
			'public/modules/**/css/*.css',
			'public/styles/app.css',
			//'public/lib/angular-chart.js/dist/angular-chart.css', 

		],
		js: [
			'public/config.js',
			'public/application.js',
			//'public/modules/*/*.js',
			//'public/modules/*/*[!tests]*/*.js',
			'public/app/**/*.js',
			// pull in templates
			'public/templates.js'			
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};