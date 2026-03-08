import { z } from "zod";
import { roleSchema } from "./role.schema";
import { actionSchema } from "./action.schema";
import { conditionSchema } from "./condition.schema";
import { resorcessSchema } from "./resorces.schema";

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

const permissionUpdateSchema =
  z.object({
    role: roleSchema.optional().nullable().default(null),
    resorce: resorcessSchema.optional().nullable().default(null),
    action: actionSchema.optional().nullable().default(null),
    value: z
      .union([conditionSchema, z.boolean()], {
        inclusive: true,
        error: "value must be boolean or condition type",
      }).optional().nullable().default(null)
  })


const queryPermissionSchema = z.object({
  role: roleSchema,
  resorce: resorcessSchema.optional().nullable(),
  action: actionSchema.optional().nullable(),
})


type PermissionSchemaType = z.infer<typeof permissionSchema>;

export type { PermissionSchemaType };

export {
  permissionSchema,
  permissionUpdateSchema,
  queryPermissionSchema
};
