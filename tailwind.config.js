/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
			black: {
				DEFAULT: '#1E293B'
			},
  			primary: {
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)'
  			},
			'alice-blue': {
				DEFAULT: 'var(--alice-blue)'
			},
			green: {
				DEFAULT: 'var(--green)',
				500: 'var(--green-500)'
			},
			red: {
				DEFAULT: 'var(--red)',
				500: 'var(--red-500)'
			},
  			neutral: {
				DEFAULT: 'var(--neutral)'
			},
  			gray: {
				DEFAULT: '#696969',
				'600': 'var(--gray-600)',
				'50': 'var(--gray-50)',
				'800': '#696969'
			},
  			'light-blue': '#F1F5F9',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: '#3B82F6',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		width: {
  			side: '260px'
  		},
  		fontSize: {
  			default: '15px',
  			sm: '13px',
			'2lg': '22px',
			'xxs': '11px'
  		},
  		spacing: {
			'custom-default': '2rem',
			'custom-md': '1.5rem',
			'custom-sm': '1.5rem',
  		},
		fontFamily: {
			'bold': ['Montserrat-Bold', 'Rubik-Bold'],
			'semibold': ['Montserrat-SemiBold', 'Rubik-SemiBold'],
			'md': ['Montserrat-Medium', 'Rubik-Medium']
		},
  		borderWidth: {
  			'1': '1px'
  		},
  		boxShadow: {
  			lg: 'var(--lg-shadow)',
			'table-shadow': 'var(--container-shadow)',
			'card': '0px 0px 30px 0px #00000012',
			'box': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  		},
  		borderRadius: {
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)',
  			sm: '6px'
  		},
		transitionTimingFunction: {
			'break': 'cubic-bezier(1,-.31,.09,1.17)'
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}