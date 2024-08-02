import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { action  as updateAvailabilityAction} from "./views/Products";
import NewProducts , { action as newProductAction } from "./views/NewProducts";
import { loader as productsLoader } from "./views/Products";
import EditProducts , { loader as editProductLoader , action as editProductAction}from "./views/EditProducts";
import {action as deleteProductAction } from "./Components/ProductDetails";

export const router = createBrowserRouter([ 
    {
        path: '/',
        element: <Layout />,
        children : [ 
            {
                index : true,
                element: <Products/>,
                loader: productsLoader,
                action : updateAvailabilityAction
            },
            {
                path: '/productos/nuevos', // ROA Pattern - Resource-ooriented design
                element: <NewProducts />,
                action : newProductAction
            },
            {
                path: '/productos/:id/editar',
                element: <EditProducts/>, 
                loader : editProductLoader,
                action : editProductAction
            },
            {
                path: '/productos/:id/eliminar',
                action : deleteProductAction
            }
        ]
    }
])