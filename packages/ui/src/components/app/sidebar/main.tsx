import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PanelLeftIcon } from "lucide-react"
import type { ComponentProps, FC } from "react"
import { useSidebar } from "./context"

type SidebarPropsType = ComponentProps<'aside'>

const Sidebar: FC<SidebarPropsType> = (props) => {
    "use no memo";
    const { isOpen, closeSidebar } = useSidebar()

    return <div
        data-state={isOpen ? 'open' : 'close'}
        className={cn("fixed inset-0 transition-all group/sidebar z-50", {
            '-translate-x-full': !isOpen
        }, 'md:translate-x-0! md:w-60 md:max-w-60 md:static', {
            'md:w-15': !isOpen
        })}>
        <button
            className="size-full bg-slate-900/50 md:hidden"
            onClick={closeSidebar}
        />
        <aside
            className="bg-background absolute left-0 top-0 bottom-0 w-1/2 md:w-full! overflow-hidden shadow"
            {...props}
        />
    </div>
}


type SidebarTriggerPropsType = Parameters<typeof Button>[0]

const SidebarTrigger: FC<SidebarTriggerPropsType> = (props) => {
    const { toggleSidebar } = useSidebar()

    return <Button {...props} variant={props.variant ?? 'ghost'}
        size={props.size ?? "icon-sm"}
        onClick={(event) => {
            props.onClick?.(event)
            toggleSidebar()
        }}
    >
        {
            props.children ?? <PanelLeftIcon />
        }
        <span className="sr-only">Toggle Sidebar</span>
    </Button>
}

export {
    Sidebar,
    SidebarTrigger
}

