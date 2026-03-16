import { Link, useLocation } from '@tanstack/react-router'
import { type FC, Fragment, useMemo } from 'react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from 'ui/ui/breadcrumb'

const Path: FC = () => {
	const path = useLocation()
	const Comp = useMemo(() => {
		const paths = path.href.split('/').filter(Boolean)

		const length = paths.length - 1

		return paths.map((path, i) => (
			<Fragment key={path}>
				<BreadcrumbItem>
					<BreadcrumbLink
						className="capitalize"
						render={<Link to={`/${paths.slice(0, i + 1).join('/')}` as '/'} />}
					>
						{path}
					</BreadcrumbLink>
				</BreadcrumbItem>
				{i < length ? <BreadcrumbSeparator /> : null}
			</Fragment>
		))
	}, [path.href])

	return (
		<Breadcrumb>
			<BreadcrumbList>{Comp}</BreadcrumbList>
		</Breadcrumb>
	)
}

export { Path }
