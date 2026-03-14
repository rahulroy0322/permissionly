import type { FC } from 'react'
import { Github } from 'ui/icons/github.tsx'
import { Google } from 'ui/icons/google.tsx'
import { Button } from 'ui/ui/button'
import { Field } from 'ui/ui/field'
import { Separator } from 'ui/ui/separator'

const SocialLogins: FC = () => (
	<div className="space-y-2">
		<Separator className="h-1" />
		<p className="text-muted-foreground text-xs text-center">
			Or continue with
		</p>
		<Field className="grid grid-cols-2">
			<Button
				size={'lg'}
				variant={'outline'}
			>
				<Google />
			</Button>
			<Button
				size={'lg'}
				variant={'outline'}
			>
				<Github />
			</Button>
		</Field>
	</div>
)

export { SocialLogins }
