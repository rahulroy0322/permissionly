import { customType, pgTable, varchar } from 'drizzle-orm/pg-core'
import { type ConditionType, conditionSchema } from 'schema/condition'
import { ROLES } from 'schema/role'
import { defaults } from './helper'

const actions = ['view', 'create', 'update', 'delete'] as const

const trues = ['1', 'true']

const falses = ['0', 'false']

const valueType = customType<{
	data: ConditionType | boolean
}>({
	dataType() {
		return 'text'
	},
	toDriver: (value): string => {
		if (typeof value === 'boolean') {
			return String(Number(value))
		}

		return JSON.stringify(conditionSchema.parse(value))
	},

	fromDriver: (value): ConditionType | boolean => {
		if (trues.includes(value as string)) {
			return true
		}
		if (falses.includes(value as string)) {
			return false
		}

		return JSON.parse(value as string)
	},
})

const Permission = pgTable('permissions', {
	role: varchar({
		enum: ROLES,
		length: 10,
	}).notNull(),
	value: valueType().default(false).notNull(),

	action: varchar({
		enum: actions,
		length: 10,
	}),
	resorce: varchar({
		length: 25,
	}),
	...defaults,
})

type _PermissionType = typeof Permission.$inferSelect

// // just for ts check
// const _Permission: _PermissionType = {
// 	id: '',
// 	email: '',
// 	name: '',
// 	pass: '',
// 	role: 'user',
// 	createdAt: '',
// 	updatedAt: '',
// } satisfies UserType

export { Permission }
