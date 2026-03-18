import type { Editor } from '@tiptap/react'
import { forwardRef, useMemo, useRef, useState } from 'react'
import { useIsBreakpoint } from '../../../hooks/use-is-breakpoint'
// --- Hooks ---
import { useMenuNavigation } from '../../../hooks/use-menu-navigation'
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'

// --- Icons ---
import { BanIcon } from '../../tiptap-icons/ban-icon'
import { HighlighterIcon } from '../../tiptap-icons/highlighter-icon'

// --- UI Primitives ---
import type { ButtonProps } from '../../tiptap-ui-primitive/button'
import { Button } from '../../tiptap-ui-primitive/button'
import { ButtonGroup } from '../../tiptap-ui-primitive/button-group'
import { Card, CardBody, CardItemGroup } from '../../tiptap-ui-primitive/card'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '../../tiptap-ui-primitive/popover'
import { Separator } from '../../tiptap-ui-primitive/separator'
// --- Tiptap UI ---
import type {
	HighlightColor,
	UseColorHighlightConfig,
} from '../color-highlight-button'
import {
	ColorHighlightButton,
	pickHighlightColorsByValue,
	useColorHighlight,
} from '../color-highlight-button'

export interface ColorHighlightPopoverContentProps {
	/**
	 * The Tiptap editor instance.
	 */
	editor?: Editor | null
	/**
	 * Optional colors to use in the highlight popover.
	 * If not provided, defaults to a predefined set of colors.
	 */
	colors?: HighlightColor[]
	/**
	 * When true, uses the actual color value (colorValue) instead of CSS variable (value).
	 * @default false
	 */
	useColorValue?: boolean
}

export interface ColorHighlightPopoverProps
	extends Omit<ButtonProps, 'type'>,
		Pick<
			UseColorHighlightConfig,
			'editor' | 'hideWhenUnavailable' | 'onApplied'
		> {
	/**
	 * Optional colors to use in the highlight popover.
	 * If not provided, defaults to a predefined set of colors.
	 */
	colors?: HighlightColor[]
	/**
	 * When true, uses the actual color value (colorValue) instead of CSS variable (value).
	 * @default false
	 */
	useColorValue?: boolean
}

export const ColorHighlightPopoverButton = forwardRef<
	HTMLButtonElement,
	ButtonProps
>(({ className, children, ...props }, ref) => (
	<Button
		aria-label="Highlight text"
		className={className}
		data-appearance="default"
		ref={ref}
		role="button"
		tabIndex={-1}
		tooltip="Highlight"
		type="button"
		variant="ghost"
		{...props}
	>
		{children ?? <HighlighterIcon className="tiptap-button-icon" />}
	</Button>
))

ColorHighlightPopoverButton.displayName = 'ColorHighlightPopoverButton'

export function ColorHighlightPopoverContent({
	editor,
	colors = pickHighlightColorsByValue([
		'var(--tt-color-highlight-green)',
		'var(--tt-color-highlight-blue)',
		'var(--tt-color-highlight-red)',
		'var(--tt-color-highlight-purple)',
		'var(--tt-color-highlight-yellow)',
	]),
	useColorValue = false,
}: ColorHighlightPopoverContentProps) {
	const { handleRemoveHighlight } = useColorHighlight({ editor })
	const isMobile = useIsBreakpoint()
	const containerRef = useRef<HTMLDivElement>(null)

	const menuItems = useMemo(
		() => [...colors, { label: 'Remove highlight', value: 'none' }],
		[colors]
	)

	const { selectedIndex } = useMenuNavigation({
		containerRef,
		items: menuItems,
		orientation: 'both',
		onSelect: (item) => {
			if (!containerRef.current) return false
			const highlightedElement = containerRef.current.querySelector(
				'[data-highlighted="true"]'
			) as HTMLElement
			if (highlightedElement) highlightedElement.click()
			if (item.value === 'none') handleRemoveHighlight()
			return true
		},
		autoSelectFirstItem: false,
	})

	return (
		<Card
			ref={containerRef}
			style={isMobile ? { boxShadow: 'none', border: 0 } : {}}
			tabIndex={0}
		>
			<CardBody style={isMobile ? { padding: 0 } : {}}>
				<CardItemGroup orientation="horizontal">
					<ButtonGroup>
						{colors.map((color, index) => (
							<ButtonGroup key={color.value}>
								<ColorHighlightButton
									aria-label={`${color.label} highlight color`}
									data-highlighted={selectedIndex === index}
									editor={editor}
									highlightColor={
										useColorValue ? color.colorValue : color.value
									}
									tabIndex={index === selectedIndex ? 0 : -1}
									tooltip={color.label}
									useColorValue={useColorValue}
								/>
							</ButtonGroup>
						))}
					</ButtonGroup>
					<Separator />
					<ButtonGroup>
						<Button
							aria-label="Remove highlight"
							data-highlighted={selectedIndex === colors.length}
							onClick={handleRemoveHighlight}
							role="menuitem"
							tabIndex={selectedIndex === colors.length ? 0 : -1}
							tooltip="Remove highlight"
							type="button"
							variant="ghost"
						>
							<BanIcon className="tiptap-button-icon" />
						</Button>
					</ButtonGroup>
				</CardItemGroup>
			</CardBody>
		</Card>
	)
}

export function ColorHighlightPopover({
	editor: providedEditor,
	colors = pickHighlightColorsByValue([
		'var(--tt-color-highlight-green)',
		'var(--tt-color-highlight-blue)',
		'var(--tt-color-highlight-red)',
		'var(--tt-color-highlight-purple)',
		'var(--tt-color-highlight-yellow)',
	]),
	hideWhenUnavailable = false,
	useColorValue = false,
	onApplied,
	...props
}: ColorHighlightPopoverProps) {
	const { editor } = useTiptapEditor(providedEditor)
	const [isOpen, setIsOpen] = useState(false)
	const { isVisible, canColorHighlight, isActive, label, Icon } =
		useColorHighlight({
			editor,
			hideWhenUnavailable,
			onApplied,
		})

	if (!isVisible) return null

	return (
		<Popover
			onOpenChange={setIsOpen}
			open={isOpen}
		>
			<PopoverTrigger asChild>
				<ColorHighlightPopoverButton
					aria-label={label}
					aria-pressed={isActive}
					data-active-state={isActive ? 'on' : 'off'}
					data-disabled={!canColorHighlight}
					disabled={!canColorHighlight}
					tooltip={label}
					{...props}
				>
					<Icon className="tiptap-button-icon" />
				</ColorHighlightPopoverButton>
			</PopoverTrigger>
			<PopoverContent aria-label="Highlight colors">
				<ColorHighlightPopoverContent
					colors={colors}
					editor={editor}
					useColorValue={useColorValue}
				/>
			</PopoverContent>
		</Popover>
	)
}

export default ColorHighlightPopover
