import { deleteProduct } from '../services/ProductService'
import { Product } from '../Types'
import { formatCurrency } from '../utils'
import {  useNavigate , Form , redirect , ActionFunctionArgs } from 'react-router-dom'

type ProductDetailsProps = { 
  product : Product
}


export async function action({params} : ActionFunctionArgs) { 

  if(params.id !== undefined) { 
    await deleteProduct( +params.id )
  }
  
  return redirect('/')
}

export default function ProductDetails( {product}  : ProductDetailsProps) {

  const navegate = useNavigate()

  return (
    <>
      <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name} 
        </td>

        <td className="p-3 text-lg text-gray-800">
            { formatCurrency( product.price )}
        </td>

        <td className="p-3 text-lg text-gray-800">
            {product.availability  ? 'Disponible' : 'No Disponible'} 
        </td>

        <td className="p-3 text-lg text-gray-800 ">
          <div className='flex justify-evenly items-center'>
            <button 
              onClick={() => navegate(`/productos/${product.id}/editar`)}
              className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white hover:bg-indigo-300 shadow-sm "
            >
              Editar
            </button>

            <Form 
              method='POST' 
              action={`/productos/${product.id}/eliminar`}
              onSubmit={(e) => {
                if(!confirm('Eliminar?')) { 
                  e.preventDefault()
                }
              }}
            >
              <input
                type='submit' 
                className="rounded-md bg-red-600 p-3 text-sm font-bold text-white hover:bg-red-300 shadow-sm "
                value='Eliminar'
              />
            
            </Form>

          </div>
        </td>
      </tr> 
    </>
  )
}
