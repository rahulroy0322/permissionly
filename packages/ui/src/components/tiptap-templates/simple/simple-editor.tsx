'use client'

import { Highlight } from '@tiptap/extension-highlight'
import { Image } from '@tiptap/extension-image'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TextAlign } from '@tiptap/extension-text-align'
import { Typography } from '@tiptap/extension-typography'
import { Selection } from '@tiptap/extensions'
import { EditorContent, EditorContext, useEditor } from '@tiptap/react'
// --- Tiptap Core Extensions ---
import { StarterKit } from '@tiptap/starter-kit'
import { type FC, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { HorizontalRule } from '../../tiptap-node/horizontal-rule-node/horizontal-rule-node-extension'
// --- Tiptap Node ---
import { ImageUploadNode } from '../../tiptap-node/image-upload-node/image-upload-node-extension'
// --- UI Primitives ---
import { Button } from '../../tiptap-ui-primitive/button'
import { Spacer } from '../../tiptap-ui-primitive/spacer'
import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
} from '../../tiptap-ui-primitive/toolbar'
import '../../tiptap-node/blockquote-node/blockquote-node.scss'
import '../../tiptap-node/code-block-node/code-block-node.scss'
import '../../tiptap-node/horizontal-rule-node/horizontal-rule-node.scss'
import '../../tiptap-node/list-node/list-node.scss'
import '../../tiptap-node/image-node/image-node.scss'
import '../../tiptap-node/heading-node/heading-node.scss'
import '../../tiptap-node/paragraph-node/paragraph-node.scss'

import { useCursorVisibility } from '../../../hooks/use-cursor-visibility'
// --- Hooks ---
import { useIsBreakpoint } from '../../../hooks/use-is-breakpoint'
import { useWindowSize } from '../../../hooks/use-window-size'
// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from '../../../lib/tiptap-utils'
// --- Icons ---
import { ArrowLeftIcon } from '../../tiptap-icons/arrow-left-icon'
import { HighlighterIcon } from '../../tiptap-icons/highlighter-icon'
import { LinkIcon } from '../../tiptap-icons/link-icon'
import { BlockquoteButton } from '../../tiptap-ui/blockquote-button'
import { CodeBlockButton } from '../../tiptap-ui/code-block-button'
import {
	ColorHighlightPopover,
	ColorHighlightPopoverButton,
	ColorHighlightPopoverContent,
} from '../../tiptap-ui/color-highlight-popover'
// --- Tiptap UI ---
import { HeadingDropdownMenu } from '../../tiptap-ui/heading-dropdown-menu'
import { ImageUploadButton } from '../../tiptap-ui/image-upload-button'
import {
	LinkButton,
	LinkContent,
	LinkPopover,
} from '../../tiptap-ui/link-popover'
import { ListDropdownMenu } from '../../tiptap-ui/list-dropdown-menu'
import { MarkButton } from '../../tiptap-ui/mark-button'
import { TextAlignButton } from '../../tiptap-ui/text-align-button'
import { UndoRedoButton } from '../../tiptap-ui/undo-redo-button'

// --- Styles ---
import './simple-editor.scss'

const MainToolbarContent = ({
	onHighlighterClick,
	onLinkClick,
	isMobile,
}: {
	onHighlighterClick: () => void
	onLinkClick: () => void
	isMobile: boolean
}) => {
	return (
		<>
			<Spacer />

			<ToolbarGroup>
				<UndoRedoButton action="undo" />
				<UndoRedoButton action="redo" />
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<HeadingDropdownMenu
					levels={[1, 2, 3, 4]}
					modal={false}
				/>
				<ListDropdownMenu
					modal={false}
					types={['bulletList', 'orderedList', 'taskList']}
				/>
				<BlockquoteButton />
				<CodeBlockButton />
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<MarkButton type="bold" />
				<MarkButton type="italic" />
				<MarkButton type="strike" />
				<MarkButton type="code" />
				<MarkButton type="underline" />
				{!isMobile ? (
					<ColorHighlightPopover />
				) : (
					<ColorHighlightPopoverButton onClick={onHighlighterClick} />
				)}
				{!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<MarkButton type="superscript" />
				<MarkButton type="subscript" />
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<TextAlignButton align="left" />
				<TextAlignButton align="center" />
				<TextAlignButton align="right" />
				<TextAlignButton align="justify" />
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<ImageUploadButton text="Add" />
			</ToolbarGroup>

			<Spacer />

			{isMobile && <ToolbarSeparator />}
		</>
	)
}

const MobileToolbarContent = ({
	type,
	onBack,
}: {
	type: 'highlighter' | 'link'
	onBack: () => void
}) => (
	<>
		<ToolbarGroup>
			<Button
				onClick={onBack}
				variant="ghost"
			>
				<ArrowLeftIcon className="tiptap-button-icon" />
				{type === 'highlighter' ? (
					<HighlighterIcon className="tiptap-button-icon" />
				) : (
					<LinkIcon className="tiptap-button-icon" />
				)}
			</Button>
		</ToolbarGroup>

		<ToolbarSeparator />

		{type === 'highlighter' ? (
			<ColorHighlightPopoverContent />
		) : (
			<LinkContent />
		)}
	</>
)

type SimpleEditorPropsType = {
	onBlur: () => void
	onChange: (value: string) => void
	value: string
	id: string
	name: string
}

const SimpleEditor: FC<SimpleEditorPropsType> = ({
	onBlur,
	onChange,
	value,
	id,
	name,
}) => {
	const changeDebounced = useDebouncedCallback(
		onChange,
		1000
	)
	const isMobile = useIsBreakpoint()
	const { height } = useWindowSize()
	const [mobileView, setMobileView] = useState<'main' | 'highlighter' | 'link'>(
		'main'
	)
	const toolbarRef = useRef<HTMLDivElement>(null)

	const editor = useEditor({
		immediatelyRender: false,
		editorProps: {
			attributes: {
				autocomplete: 'off',
				autocorrect: 'off',
				autocapitalize: 'off',
				'aria-label': 'Main content area, start typing to enter text.',
				class: 'simple-editor',
			},
		},
		extensions: [
			StarterKit.configure({
				horizontalRule: false,
				link: {
					openOnClick: false,
					enableClickSelection: true,
				},
			}),
			HorizontalRule,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			TaskList,
			TaskItem.configure({ nested: true }),
			Highlight.configure({ multicolor: true }),
			Image,
			Typography,
			Superscript,
			Subscript,
			Selection,
			ImageUploadNode.configure({
				accept: 'image/*',
				maxSize: MAX_FILE_SIZE,
				limit: 3,
				upload: handleImageUpload,
				onError: (error) => console.error('Upload failed:', error),
			}),
		],
		onBlur,
		onUpdate({ editor }) {
			changeDebounced(
				editor.getHTML()
			)
		},
		content: value,
	})

	const rect = useCursorVisibility({
		editor,
		overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
	})

	useEffect(() => {
		if (!isMobile && mobileView !== 'main') {
			setMobileView('main')
		}
	}, [isMobile, mobileView])

	return (
		<div className="simple-editor-wrapper">
			<EditorContext.Provider value={{ editor }}>
				<Toolbar
					ref={toolbarRef}
					style={{
						...(isMobile
							? {
								bottom: `calc(100% - ${height - rect.y}px)`,
							}
							: {}),
					}}
				>
					{mobileView === 'main' ? (
						<MainToolbarContent
							isMobile={isMobile}
							onHighlighterClick={() => setMobileView('highlighter')}
							onLinkClick={() => setMobileView('link')}
						/>
					) : (
						<MobileToolbarContent
							onBack={() => setMobileView('main')}
							type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
						/>
					)}
				</Toolbar>

				<EditorContent
					className="simple-editor-content"
					editor={editor}
					id={id}
					name={name}
					role="presentation"
				/>
			</EditorContext.Provider>
		</div>
	)
}

export { SimpleEditor }
