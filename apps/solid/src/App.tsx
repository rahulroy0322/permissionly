import { createSignal } from 'solid-js'
import viteLogo from '/vite.svg'
import solidLogo from './assets/solid.svg'
import './App.css'
import { Can } from 'policy/solid'
import type { Component } from 'solid-js'

const MayBe: Component<{
	className: string
}> = ({ className }) => (
	<div class={className}>may be this gives editor support</div>
)

const Profile: Component = () => {
	return (
		<div class="bg-red-500 text-center">
			Loggedin User Profile
			<p>Proceted data</p>
			<MayBe className="" />
		</div>
	)
}

function App() {
	const [count, setCount] = createSignal(0)

	return (
		<>
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
			<div>
				<a
					href="https://vite.dev"
					rel="noopener"
					target="_blank"
				>
					<img
						alt="Vite logo"
						class="logo"
						src={viteLogo}
					/>
				</a>
				<a
					href="https://solidjs.com"
					rel="noopener"
					target="_blank"
				>
					<img
						alt="Solid logo"
						class="logo solid"
						src={solidLogo}
					/>
				</a>
			</div>
			<h1>Vite + Solid</h1>
			<div class="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count()}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p class="read-the-docs">
				Click on the Vite and Solid logos to learn more
			</p>
		</>
	)
}

export default App
