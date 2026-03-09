import type { FC, ReactNode } from 'react'
import { cn } from 'ui/lib/utils'

import { UserCircle2 } from 'lucide-react'

import { Avatar as Av, AvatarFallback, AvatarImage } from 'ui/ui/avatar'

type AvatarPropsType = {
    src: string | undefined
    alt: string | undefined
} & Parameters<typeof Av>[0]

const Avatar: FC<AvatarPropsType> = ({ src, alt, className, ...props }) => (
    <Av
        {...props}
        className={cn('size-8 cursor-pointer', className)}
    >
        <AvatarImage
            alt={alt}
            src={src}
        />
        <AvatarFallback>
            <UserCircle2 className="size-full" />
        </AvatarFallback>
    </Av>
)

export { Avatar }