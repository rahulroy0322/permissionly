import { useRouter } from '@tanstack/react-router'
import { PermissionFrom } from 'forms'
import { Plus } from 'lucide-react'
import { type FC, useCallback, useState } from 'react'
import type { PermissionSchemaType } from 'schema/permission'
import { createPermission } from 'src/api/permission'
import { Button } from 'ui/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from 'ui/ui/dialog'
import { toast } from 'ui/ui/sonner'

const PermissionCreateFrom: FC = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const handleSubmit = useCallback(
		async (permission: PermissionSchemaType) => {
			try {
				setLoading(true)
				await createPermission(permission)
				router.invalidate({
					forcePending: true,
				})
			} catch (e) {
				toast.error((e as Error).message)
			} finally {
				setLoading(false)
			}
		},
		[router.invalidate]
	)

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
					disabled={loading}
					handleSubmit={handleSubmit}
				/>
			</DialogContent>
		</Dialog>
	)
}

export { PermissionCreateFrom }
