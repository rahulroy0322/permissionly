import preactLogo from '../../assets/preact.svg'
import './style.css'

export function Home() {
	return (
		<div class="home">
			<a
				href="https://preactjs.com"
				rel="noopener"
				target="_blank"
			>
				<img
					alt="Preact logo"
					height="160"
					src={preactLogo}
					width="160"
				/>
			</a>
			<h1>Get Started building Vite-powered Preact Apps </h1>
			<section>
				<Resource
					description="If you're new to Preact, try the interactive tutorial to learn important concepts"
					href="https://preactjs.com/tutorial"
					title="Learn Preact"
				/>
				<Resource
					description="If you're coming from React, you may want to check out our docs to see where Preact differs"
					href="https://preactjs.com/guide/v10/differences-to-react"
					title="Differences to React"
				/>
				<Resource
					description="To learn more about Vite and how you can customize it to fit your needs, take a look at their excellent documentation"
					href="https://vitejs.dev"
					title="Learn Vite"
				/>
			</section>
		</div>
	)
}

function Resource(props) {
	return (
		<a
			class="resource"
			href={props.href}
			target="_blank"
		>
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	)
}
