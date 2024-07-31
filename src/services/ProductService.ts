import { DraftProductSchema } from "../Types"
import { safeParse } from "valibot"
import axios from "axios"


type addProductPros = { 
    [k: string]: FormDataEntryValue
}

export const addProduct =  async ( data  : addProductPros) => { 
    try {

        const result = safeParse( DraftProductSchema , {
            name : data.name,
            price : +data.price
        })

        if( result.success) { 

            const url = `${import.meta.env.VITE_API_URL}/api/products`
            const { data } = await axios.post(url , { 
                name : result.output.name,
                price : result.output.price
            })

        } else { 
            throw new Error('Datos no validos')
        }

    } catch (error) {
        console.log( error )
    }
}