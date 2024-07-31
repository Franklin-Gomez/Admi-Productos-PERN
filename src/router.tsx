import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products from "./views/Products";
import NewProducts , { action as newProductAction } from "./views/NewProducts";
import { loader as productsLoader } from "./views/Products";
import EditProducts , { loader as editProductLoader }from "./views/EditProducts";

export const router = createBrowserRouter([ 
    {
        path: '/',
        element: <Layout />,
        children : [ 
            {
                index : true,
                element: <Products/>,
                loader: productsLoader
            },
            {
                path: '/productos/nuevos', // ROA Pattern - Resource-ooriented design
                element: <NewProducts />,
                action : newProductAction
            },
            {
                path: '/productos/:id/editar',
                element: <EditProducts/>, 
                loader : editProductLoader
            }
        ]
    }
])