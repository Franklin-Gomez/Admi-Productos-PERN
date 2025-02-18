import { Link , Form, useActionData, ActionFunctionArgs , redirect, LoaderFunctionArgs , useLoaderData } from "react-router-dom"
import ErrorMessage from "../Components/ErrorMessage"
import { getProductsById , updateProduct } from "../services/ProductService"
import { Product } from "../Types"
import ProductForm from "../Components/ProductForm"

// funcion para procesar los datos
export async function action({request , params } : ActionFunctionArgs ) { 

    const data = Object.fromEntries( await  request.formData() )
  
    let error = ''

    if( Object.values(data).includes('')) { 
        error = 'Todos los campos son obligatorios'
    }
 
    if( error.length ) { 
        return error
    }

    if( params.id !== undefined) { 
        await updateProduct( data , +params.id )
    }

    //return {} // siempre retornaremos algo
    return redirect('/')
}

// funcion para capturar los datos a editar
export const loader = async( { params } : LoaderFunctionArgs) => { 

    if( params.id !== undefined) { 
        const data = await getProductsById(+params.id)

        if(!data) { 
            return redirect('/')
        }

        return data
    }

    return {}
}

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
]

export default function EditProducts() {

    const error = useActionData() as string

    const product = useLoaderData() as Product

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500"> Editar Productos </h2>

                <Link 
                    to='/'
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white hover:bg-indigo-300 shadow-sm "
                >
                    Volver a Productos
                </Link>

            </div>

            { error &&  <ErrorMessage> {error} </ErrorMessage>  }

            <Form
                className="mt-10" 
                method="POST"     
            >

                <ProductForm
                    product={product}
                />
            
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select 
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option 
                                key={option.name} value={option.value.toString()}
                            >{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />

            </Form>
        </>
    )
}
