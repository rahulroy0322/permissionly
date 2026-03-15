import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon,
} from 'lucide-react'
import { Toaster as Sonner, type ToasterProps ,toast} from 'sonner'

import { useTheme } from '../app/theme/context'

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme } = useTheme()

	return (
		<Sonner
			className="toaster group"
			icons={{
				success: <CircleCheckIcon className="size-4" />,
				info: <InfoIcon className="size-4" />,
				warning: <TriangleAlertIcon className="size-4" />,
				error: <OctagonXIcon className="size-4" />,
				loading: <Loader2Icon className="size-4 animate-spin" />,
			}}
			style={
				{
					'--normal-bg': 'var(--popover)',
					'--normal-text': 'var(--popover-foreground)',
					'--normal-border': 'var(--border)',
					'--border-radius': '0',
				} as React.CSSProperties
			}
			theme={theme as ToasterProps['theme']}
			toastOptions={{
				classNames: {
					toast: 'cn-toast',
				},
			}}
			{...props}
		/>
	)
}

export { Toaster ,toast}
