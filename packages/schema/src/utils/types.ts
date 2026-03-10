type DefaultsType = {
    id: string
    createdAt: string
    updatedAt: string
}

type Prettify<Obj extends Record<string, unknown>> = {
    [Key in keyof Obj]: Obj[Key];
} & {};


export type {
    DefaultsType,
    Prettify
}