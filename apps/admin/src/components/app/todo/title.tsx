import type { FC } from 'react'
import type { TodoWithSubAndUserType } from 'schema/todo'

type TitlePropsType = Pick<TodoWithSubAndUserType, 'completed' | 'title'>

const Title: FC<TitlePropsType> = ({ completed, title }) =>
	completed ? <s>{title}</s> : title

export { Title }
