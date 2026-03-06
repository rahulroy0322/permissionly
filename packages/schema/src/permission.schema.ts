import { z } from "zod";
import { roleSchema } from "./role.schema";
import { actionSchema } from "./action.schema";
import { conditionSchema } from "./condition.schema";
import { resorcessSchema } from "./resorces.schema";

// todo make in type fraendly
const permissionSchema = z.union([
  z.object({
    role: roleSchema,
    resorce: resorcessSchema.optional().nullable(),
    action: actionSchema.optional().nullable(),
    value: z.boolean().default(false),
  }),
  z.object({
    role: roleSchema,
    resorce: resorcessSchema,
    action: actionSchema.optional().nullable(),
    value: z.boolean().default(false),
  }),
  z.object({
    role: roleSchema,
    resorce: resorcessSchema,
    action: actionSchema,
    value: z
      .union([conditionSchema, z.boolean()], {
        inclusive: true,
        error: "value must be boolean or condition type",
      })
      .default(false),
  }),
]);

type PermissionSchemaType = z.infer<typeof permissionSchema>;

export type { PermissionSchemaType };

export { permissionSchema };
