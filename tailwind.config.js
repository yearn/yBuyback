const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	corePlugins: {
		ringColor: false,
	},
	darkMode: 'class',
	content: [
		'./pages/**/*.js',
		'./components/**/*.js'
	],
	theme: {
		fontFamily: {
			roboto: ['Roboto', ...defaultTheme.fontFamily.sans]
		},
		colors: {
			'dark-blue-1': '#001746',
			'dark-blue-2': '#183672',
			'dark-blue-3': '#012A7C',
			'gray-blue-1': '#475570',
			'gray-blue-2': '#7F8DA9',
			'gray-blue-3': '#CED5E3',
			'yearn-blue': '#0657F9',
			'yearn-blue-light-1': '#C6D7F9',
			'yearn-blue-light-2': '#E0EAFF',
			'yearn-blue-dark': '#004ADF',
			'white': '#FFFFFF',
			'white-blue-1': '#F4F7FB',
			'white-blue-2': '#F9FBFD',
		},
		extend: {
			gridTemplateColumns: {
				'22': 'repeat(22, minmax(0, 1fr))',
			},
			width: {
				33: '8.25rem',
				38: '9.5rem',
				42: '10.5rem',
				50: '12.5rem',
				55: '13.75rem',
				100: '25rem',
			},
			height: {
				'table-wrapper': 'calc(100vh - 54px)',
				102: '25.5rem',
				106: '26.5rem',
				136: '34rem',
				'70vh': '70vh',
			},
			minWidth: {
				32: '8rem',
				33: '8.25rem',
				36: '9rem',
				40: '10rem'
			},
			maxWidth: {
				'xl': '552px',
				'4xl': '904px',
				'6xl': '1200px',
			},
			fontSize: {
				'sm': ['12px', '16px'],
				'base': ['16px', '24px'],
				'lg': ['20px', '32px'],
				'xl': ['24px', '32px'],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms')
	],
};