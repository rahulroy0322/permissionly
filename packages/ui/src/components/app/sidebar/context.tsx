import { createContext, use, useCallback, useState, type FC, type ReactNode } from "react"

type SidebarContentType = {
    isOpen: boolean
    openSidebar: () => void
    closeSidebar: () => void
    toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContentType | null>(null)


type SidebarProviderPropsType = {
    children: ReactNode
    defaultOpen?: boolean
}

const SidebarProvider: FC<SidebarProviderPropsType> = ({
    defaultOpen = false,
    children
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    const openSidebar = useCallback(() => {
        setIsOpen(true)
    }, [])

    const closeSidebar = useCallback(() => {
        setIsOpen(false)
    }, [])

    const toggleSidebar = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    console.log(
        {isOpen}
    );
    

    return <SidebarContext value={{
        isOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
    }}>
        {children}
    </SidebarContext>
}

const useSidebar = () => {
    const context = use(SidebarContext)

    if (!context) {
        throw new Error(`sidebar components should be wraped inside <SidebarProvider>`)
    }

    return context
}

export {
    SidebarProvider,
    useSidebar
}