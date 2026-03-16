import { PermissionFrom } from 'forms'
import { Plus } from 'lucide-react'
import type { FC } from 'react'
import { Button } from 'ui/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from 'ui/ui/dialog'

const PermissionCreateFrom: FC = () => {
	return (
		<Dialog>
			<div className="flex items-center justify-end">
				<DialogTrigger
					className=""
					render={<Button />}
				>
					<Plus size={20} /> new Permission
				</DialogTrigger>
			</div>
			<DialogContent>
				<DialogTitle>Add Permission</DialogTitle>
				<DialogDescription>Define New Permission</DialogDescription>
				<PermissionFrom
					disabled
					handleSubmit={() => {}}
				/>
			</DialogContent>
		</Dialog>
	)
}

export { PermissionCreateFrom }
