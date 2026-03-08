import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1, "title is Required!"),
  slug: z.string().min(1, "slug is Required!").slugify(),
  content: z.string().min(1, "content is Required!"),
  desc: z.string().min(1, "desc is Required!")
    .max(100, "desc should not more then 100"),
})

type PostSchemaType = z.infer<typeof postSchema>;

export type { PostSchemaType };

export {
  postSchema
};
