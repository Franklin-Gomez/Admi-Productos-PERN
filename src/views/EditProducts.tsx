import { Link , Form, useActionData, ActionFunctionArgs , redirect, useLocation } from "react-router-dom"
import ErrorMessage from "../Components/ErrorMessage"
import { addProduct } from "../services/ProductService"

// funcion para procesar los datos
export async function action({request} : ActionFunctionArgs) { 

    const data = Object.fromEntries( await  request.formData() )
  
    let error = ''

    if( Object.values(data).includes('')) { 
        error = 'Todos los campos son obligatorios'
    }
 
    if( error.length ) { 
        return error
    }

    await addProduct( data )

    //return {} // siempre retornaremos algo
    return redirect('/')
}

export default function EditProducts() {

    const error = useActionData() as string

    // recupera informacion
    const {state} = useLocation()

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
            
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="name"
                    >Nombre Producto:</label>
                    <input 
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del Producto"
                        name="name"
                        defaultValue={state.product.name}
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="price"
                    >Precio:</label>
                    <input 
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 200, 300"
                        name="price"
                        defaultValue={state.product.price}
                    />
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
