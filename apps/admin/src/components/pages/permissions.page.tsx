import { Database, Layers, Lock, Unlock } from 'lucide-react'
import type { FC } from 'react'
import type { PermissionSchemaType } from 'schema/permission'
import { StatCard } from '#/permission/stat.card'
import { PermissionsTable } from '#/permission/table'
import Wraper from '#/wraper'

type PermissionsPagePropsType = {
	data: PermissionSchemaType[]

	allowed: number
	denied: number
	logical: number
	total: number
}

const PermissionsPage: FC<PermissionsPagePropsType> = ({
	data,
	allowed,
	denied,
	logical,
	total,
}) => (
	<Wraper className="py-4">
		<main className="space-y-4">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<StatCard
					color="text-blue-500"
					Icon={Database}
					label="Total"
					value={total}
				/>

				<StatCard
					color="text-emerald-500"
					Icon={Unlock}
					label="Allowed"
					value={allowed}
				/>

				<StatCard
					color="text-rose-500"
					Icon={Lock}
					label="Denied"
					value={denied}
				/>

				<StatCard
					color="text-amber-500"
					Icon={Layers}
					label="Logic"
					value={logical}
				/>
			</div>
			<PermissionsTable data={data} />
		</main>
	</Wraper>
)

export default PermissionsPage
