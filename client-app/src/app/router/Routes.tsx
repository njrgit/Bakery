import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ProductMenu from "../../features/product/menu/ProductMenu";
import ProductForm from "../../features/product/form/ProductForm";

export const routes: RouteObject[] = [{
    path: '/',
    element: <App />,
    children: [
        { path: "", element: <HomePage /> },
        { path: "/veg", element: <ProductMenu /> },
        { path: "/nonveg", element: <ProductMenu /> },
        { path: "/products/:id", element: <ProductForm /> },
        { path: "/create", element: <ProductForm /> }
    ]
}]

export const router = createBrowserRouter(routes);