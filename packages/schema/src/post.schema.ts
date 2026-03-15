import { z } from 'zod'
import type { UserType } from './auth.schema'

const postSchema = z.object({
	title: z.string().min(1, 'title is Required!'),
	slug: z.string().min(1, 'slug is Required!').slugify(),
	content: z.string().min(1, 'content is Required!'),
	desc: z
		.string()
		.min(1, 'desc is Required!')
		.max(100, 'desc should not more then 100'),
})

const postUpdateSchema = postSchema.partial()

type PostSchemaType = z.infer<typeof postSchema>

type PostType = PostSchemaType & {
	userId: string
}

type _UserType = Pick<UserType, 'name' | 'email' | 'id'>

type PostWithUserType = PostType & {
	author: _UserType
}

export type { PostSchemaType, PostType, PostWithUserType }

export { postSchema, postUpdateSchema }
