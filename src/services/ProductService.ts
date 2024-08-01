import { DraftProductSchema , ProducstSchema , ProductSchema , Product } from "../Types"
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
            await axios.post(url , { 
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

export const getProducts =  async () => { 
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        const result = safeParse( ProducstSchema , data.data)

        if( result.success) { 
            return result.output
        }else { 
            throw new Error('hubo un error')
        }
    } catch (error) {
        console.log( error )
    }
}

export const getProductsById =  async (id : Product['id']) => { 
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        const result = safeParse( ProductSchema , data.data)

        if( result.success) { 
            return result.output
        }else { 
            throw new Error('hubo un error')
        }
    } catch (error) {
        console.log( error )
    }
}