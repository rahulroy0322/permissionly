import type { TodoType } from 'schema/todo'
import type { RoleSchemaType } from 'schema/role'
import type { UserType } from 'schema/auth'

type _UserType = Pick<UserType, 'id' | 'role'>

type ActionsType = 'view' | 'create' | 'update' | 'delete'

type PermissionsType = {
    todos: TodoType
}

type RuleType<Permission extends keyof PermissionsType> =
    | boolean
    | ((user: _UserType, data: PermissionsType[Permission]) => boolean)

type PermissionType<Permission extends keyof PermissionsType> = boolean | Partial<{
    [Action in ActionsType]: RuleType<Permission>
}>

type RulesWithPermissionsType = {
    [Role in RoleSchemaType]: {
        [Permission in keyof PermissionsType]: PermissionType<Permission>
    }
}

const ROLES = {
    super: {
        todos: true
    },
    admin: {
        todos: {
            view: true,
            create: true,
            update: true,
            delete: (_, todo) => todo.completed,
        },
    },
    moderator: {
        todos: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },
    },
    user: {
        todos: {
            view: (user, todo) =>
                todo.userId === user.id || todo.invitedUsers.includes(user.id),
            create: true,
            update: (user, todo) =>
                todo.userId === user.id || todo.invitedUsers.includes(user.id),
            delete: (user, todo) => todo.userId === user.id
        },
    },
} as const satisfies RulesWithPermissionsType

const hasPermission = <Resource extends keyof PermissionsType>({
    user,
    resorce,
    action,
    data
}: {
    user: _UserType,
    resorce: Resource
    action: ActionsType
    data?: PermissionsType[Resource]
}): boolean => {
    if (!user || !user.role) {
        return false
    }

    const _resorce = ROLES[user.role][resorce]

    if (typeof _resorce === 'boolean') {
        return _resorce
    }

    const permission = _resorce?.[action]

    if (!permission) {
        return false
    }

    if (typeof permission === 'boolean') {
        return permission
    }

    return (data && permission(user, data)) || false
}

export {
    hasPermission
}