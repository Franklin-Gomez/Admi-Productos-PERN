import { DraftProductSchema } from "../Types"
import { safeParse } from "valibot"

type addProductPros = { 
    [k: string]: FormDataEntryValue
}

export const addProduct = ( data  : addProductPros) => { 
    try {
        
        const result = safeParse( DraftProductSchema , {
            name : data.name,
            price : +data.price
        })

        console.log( result )

    } catch (error) {
        console.log( error )
    }
}