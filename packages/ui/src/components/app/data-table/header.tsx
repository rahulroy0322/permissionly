"use no memo";
import { cn } from "@/lib/utils"
import type { Column } from "@tanstack/react-table"
import type { HTMLAttributes, ReactNode } from "react"
import {
    ChevronsUpDown,
    ChevronUp,
    ChevronDown
} from 'lucide-react'

import {Button} from '@/components/ui/button'

type DataTableColumnHeaderProps<TData, TValue> = {
    column: Column<TData, TValue>
    title: string
} & HTMLAttributes<HTMLDivElement>

const DataTableColumnHeader = <TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>): ReactNode => {
    if (!column.getCanSort()) {
        return <div className={cn('text-center', className)}>{title}</div>
    }

    const sorting = column.getIsSorted()

    const Comp =
        sorting === 'asc'
            ? ChevronUp
            : sorting === 'desc'
                ? ChevronDown
                : ChevronsUpDown

    return (
        <Button
            className={cn('bg-transparent! w-full', className)}
            onClick={column.getToggleSortingHandler()}
            variant="ghost"
        >
            <span>{title}</span> <Comp className="size-4" />
        </Button>
    )
}

export {
    DataTableColumnHeader
}