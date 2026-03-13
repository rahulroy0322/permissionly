import { cn } from "@/lib/utils"
import type { ComponentProps, FC, ReactNode } from "react"

type SidebarHeaderPropsType = ComponentProps<'div'>

const SidebarHeader: FC<SidebarHeaderPropsType> = (props) => <header
    {...props}
    className={cn('px-4 py-2 flex flex-col gap-1 items-center justify-center', props.className)}
/>

type SidebarLogoPropsType = {
    Icon: ReactNode
} & ComponentProps<'div'>

const SidebarLogo: FC<SidebarLogoPropsType> = ({
    Icon,
    className,
    children,
    ...props
}) => <div {...props}
    className={cn('flex items-center gap-2 group-data-[state=close]/sidebar:gap-0', className)}
>
        {Icon} 
            <span className="group-data-[state=close]/sidebar:hidden">
            {children}
        </span>
    </div>

export {
    SidebarHeader,
    SidebarLogo
}
