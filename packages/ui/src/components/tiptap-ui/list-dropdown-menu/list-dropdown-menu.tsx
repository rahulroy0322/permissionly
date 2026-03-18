import type { Editor } from '@tiptap/react'
import { useCallback, useState } from 'react'

// --- Hooks ---
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'

// --- Icons ---
import { ChevronDownIcon } from '../../tiptap-icons/chevron-down-icon'

// --- Tiptap UI ---
import { ListButton, type ListType } from '../../tiptap-ui/list-button'

import { useListDropdownMenu } from '../../tiptap-ui/list-dropdown-menu/use-list-dropdown-menu'

// --- UI Primitives ---
import type { ButtonProps } from '../../tiptap-ui-primitive/button'
import { Button } from '../../tiptap-ui-primitive/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../tiptap-ui-primitive/dropdown-menu'

export interface ListDropdownMenuProps extends Omit<ButtonProps, 'type'> {
	/**
	 * The Tiptap editor instance.
	 */
	editor?: Editor
	/**
	 * The list types to display in the dropdown.
	 */
	types?: ListType[]
	/**
	 * Whether the dropdown should be hidden when no list types are available
	 * @default false
	 */
	hideWhenUnavailable?: boolean
	/**
	 * Callback for when the dropdown opens or closes
	 */
	onOpenChange?: (isOpen: boolean) => void
	/**
	 * Whether the dropdown should use a modal
	 */
	modal?: boolean
}

export function ListDropdownMenu({
	editor: providedEditor,
	types = ['bulletList', 'orderedList', 'taskList'],
	hideWhenUnavailable = false,
	onOpenChange,
	modal = true,
	...props
}: ListDropdownMenuProps) {
	const { editor } = useTiptapEditor(providedEditor)
	const [isOpen, setIsOpen] = useState(false)

	const { filteredLists, canToggle, isActive, isVisible, Icon } =
		useListDropdownMenu({
			editor,
			types,
			hideWhenUnavailable,
		})

	const handleOnOpenChange = useCallback(
		(open: boolean) => {
			setIsOpen(open)
			onOpenChange?.(open)
		},
		[onOpenChange]
	)

	if (!isVisible) {
		return null
	}

	return (
		<DropdownMenu
			modal={modal}
			onOpenChange={handleOnOpenChange}
			open={isOpen}
		>
			<DropdownMenuTrigger asChild>
				<Button
					aria-label="List options"
					data-active-state={isActive ? 'on' : 'off'}
					data-disabled={!canToggle}
					disabled={!canToggle}
					role="button"
					tabIndex={-1}
					tooltip="List"
					type="button"
					variant="ghost"
					{...props}
				>
					<Icon className="tiptap-button-icon" />
					<ChevronDownIcon className="tiptap-button-dropdown-small" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start">
				<DropdownMenuGroup>
					{filteredLists.map((option) => (
						<DropdownMenuItem
							asChild
							key={option.type}
						>
							<ListButton
								editor={editor}
								showTooltip={false}
								text={option.label}
								type={option.type}
							/>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ListDropdownMenu
