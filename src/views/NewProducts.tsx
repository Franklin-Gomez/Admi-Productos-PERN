import { Link } from "react-router-dom"


export default function NewProducts() {
  return (
    <>
        <div className="flex justify-between">
            <h2 className="text-4xl font-black text-slate-500"> Registrar Productos </h2>

            <Link 
                to='/'
                className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white hover:bg-indigo-300 shadow-sm "
            >
                Volver a Productos
            </Link>

        </div>
    </>
  )
}
