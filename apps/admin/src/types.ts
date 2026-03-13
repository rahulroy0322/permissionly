// ! TODO

import type { ActionSchemaType } from 'schema/action'
import type { UserType } from 'schema/auth'

type ActivityType = {
	id: string
	action: Exclude<ActionSchemaType, 'read'>
	text: string
	userId: UserType['id']
}

type ActivityWithUserType = ActivityType & {
	user: Pick<UserType, 'id' | 'name'>
}

export type { ActivityType, ActivityWithUserType }
