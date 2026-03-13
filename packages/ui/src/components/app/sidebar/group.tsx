import { cn } from "@/lib/utils"
import type { ComponentProps, FC, ReactNode } from "react"

type SidebarGroupPropsType = ComponentProps<'div'>

const SidebarGroup: FC<SidebarGroupPropsType> = (props) => <div
    {...props}
    className={cn(props.className,)}
/>


type SidebarGroupLabelPropsType = ComponentProps<'div'>

const SidebarGroupLabel: FC<SidebarGroupLabelPropsType> = (props) => <span
    {...props}
    className={cn('text-muted-foreground text-sm group-data-[state=close]/sidebar:hidden', props.className)}
/>

type SidebarGroupContentPropsType = ComponentProps<'div'>

const SidebarGroupContent: FC<SidebarGroupContentPropsType> = (props) => <div
    {...props}
    className={cn('mt-2 flex flex-col gap-0.5 group-data-[state=close]/sidebar:m-0', props.className)}
/>

type SidebarGroupItemPropsType = ComponentProps<'div'> & {
    Icon: ReactNode
}

const SidebarGroupItem: FC<SidebarGroupItemPropsType> = ({
    children,
    Icon,
    className,
    ...props
}) => {
    return <div {...props} className={cn("text-lg font-semibold flex items-center gap-2 p-1 hover:bg-secondary relative", className)}>
        <span className="bg-primary/10 size-8 group-data-[state=close]/sidebar:ml-auto flex items-center justify-center p-1">
            {Icon}
        </span>
        <p className="text-inherit group-data-[state=close]/sidebar:hidden">
            {children}
        </p>
    </div>
}

export {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarGroupItem
}