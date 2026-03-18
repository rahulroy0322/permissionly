import { forwardRef, useCallback, useState } from 'react'
// --- Hooks ---
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
// --- Icons ---
import { ChevronDownIcon } from '../../tiptap-icons/chevron-down-icon'
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
// --- Tiptap UI ---
import { HeadingButton } from '../heading-button'
import type { UseHeadingDropdownMenuConfig } from '../heading-dropdown-menu'
import { useHeadingDropdownMenu } from '../heading-dropdown-menu'

export interface HeadingDropdownMenuProps
	extends Omit<ButtonProps, 'type'>,
		UseHeadingDropdownMenuConfig {
	/**
	 * Callback for when the dropdown opens or closes
	 */
	onOpenChange?: (isOpen: boolean) => void
	/**
	 * Whether the dropdown should use a modal
	 */
	modal?: boolean
}

/**
 * Dropdown menu component for selecting heading levels in a Tiptap editor.
 *
 * For custom dropdown implementations, use the `useHeadingDropdownMenu` hook instead.
 */
export const HeadingDropdownMenu = forwardRef<
	HTMLButtonElement,
	HeadingDropdownMenuProps
>(
	(
		{
			editor: providedEditor,
			levels = [1, 2, 3, 4, 5, 6],
			hideWhenUnavailable = false,
			onOpenChange,
			children,
			modal = true,
			...buttonProps
		},
		ref
	) => {
		const { editor } = useTiptapEditor(providedEditor)
		const [isOpen, setIsOpen] = useState<boolean>(false)
		const { isVisible, isActive, canToggle, Icon } = useHeadingDropdownMenu({
			editor,
			levels,
			hideWhenUnavailable,
		})

		const handleOpenChange = useCallback(
			(open: boolean) => {
				if (!editor || !canToggle) return
				setIsOpen(open)
				onOpenChange?.(open)
			},
			[canToggle, editor, onOpenChange]
		)

		if (!isVisible) {
			return null
		}

		return (
			<DropdownMenu
				modal={modal}
				onOpenChange={handleOpenChange}
				open={isOpen}
			>
				<DropdownMenuTrigger asChild>
					<Button
						aria-label="Format text as heading"
						aria-pressed={isActive}
						data-active-state={isActive ? 'on' : 'off'}
						data-disabled={!canToggle}
						disabled={!canToggle}
						role="button"
						tabIndex={-1}
						tooltip="Heading"
						type="button"
						variant="ghost"
						{...buttonProps}
						ref={ref}
					>
						{children ? (
							children
						) : (
							<>
								<Icon className="tiptap-button-icon" />
								<ChevronDownIcon className="tiptap-button-dropdown-small" />
							</>
						)}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="start">
					<DropdownMenuGroup>
						{levels.map((level) => (
							<DropdownMenuItem
								asChild
								key={`heading-${level}`}
							>
								<HeadingButton
									editor={editor}
									level={level}
									showTooltip={false}
									text={`Heading ${level}`}
								/>
							</DropdownMenuItem>
						))}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
)

HeadingDropdownMenu.displayName = 'HeadingDropdownMenu'

export default HeadingDropdownMenu
