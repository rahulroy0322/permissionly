import { render } from 'preact'
import { LocationProvider, Route, Router } from 'preact-iso'

import { Header } from './components/Header.jsx'
import { NotFound } from './pages/_404.jsx'
import { Home } from './pages/Home/index.jsx'
import './style.css'
import { Can } from 'policy/web'
import type { FC } from 'preact/compat'

const Profile: FC = () => {
	return (
		<div className="bg-red-900 text-center">
			Loggedin User Profile
			<p>Proceted data</p>
		</div>
	)
}

export function App() {
	return (
		<LocationProvider>
			<Header />
			<Can
				action="view"
				resorce="todos"
				user={{
					id: '',
					role: 'super',
				}}
			>
				{Profile}
			</Can>
			<main>
				<Router>
					<Route
						component={Home}
						path="/"
					/>
					<Route
						component={NotFound}
						default
					/>
				</Router>
			</main>
		</LocationProvider>
	)
}

render(<App />, document.getElementById('app'))
