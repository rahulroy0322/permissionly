import type { FC, } from "react"
import { hasPermission } from "../core/main"


type CanPropsType = {
    children: FC
} & Parameters<typeof hasPermission>[0]

const Can: FC<CanPropsType> = (
    { children,
        ...props
    }

) => {

    if (!hasPermission(props)) {
        return null
    }

    return children({})
}

export {
    Can
}