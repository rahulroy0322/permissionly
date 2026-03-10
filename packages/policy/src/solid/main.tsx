import type { Component } from 'solid-js'
import { Can as C } from '../web/main'

type CanPropsType = Omit<Parameters<typeof C>[0], 'children'> & {
	children: Component
}

const Can: Component<CanPropsType> = C as unknown as Component<CanPropsType>

export { Can }
