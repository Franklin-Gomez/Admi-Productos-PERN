import { boolean, number, object , string  , InferOutput, array } from "valibot";

// schemas
export const DraftProductSchema = object({
    name : string(),
    price : number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability : boolean()
})

export const ProducstSchema = array( ProductSchema)


// types
export type Product = InferOutput< typeof ProductSchema>
export type Products = InferOutput< typeof ProducstSchema>