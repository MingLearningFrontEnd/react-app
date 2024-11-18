import React from "react";
// import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "../utils/http/RequireAuth";
import { RouteObject } from "react-router-dom";
const Home = React.lazy(() => import('../pages/home'));
const Login = React.lazy(() => import('../pages/login'));
const NotFound = React.lazy(() => import('../pages/404'));
const Surrender = React.lazy(()=>import ('../pages/finance/surrender'))


// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <RequireAuth allowed={true} redirectTo="/login" > <Home/> </RequireAuth>
//     },
//     {
//         path:'/login',
//         element: <RequireAuth allowed={false} redirectTo="/" > <Login/> </RequireAuth>

//     },
//     {
//         path:'*',
//         element:<NotFound/>
//     }
// ])

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RequireAuth allowed={true} redirectTo="/login"> <Home /> </RequireAuth>
    },

    {
        path: '/login',
        element: <RequireAuth allowed={false} redirectTo="/dashboard"> <Login /> </RequireAuth>

    },

    {
        path:'/finance/surrender',
        element:<RequireAuth allowed={true} redirectTo="login"><Surrender/></RequireAuth> 

    },

    {
        path: '*',
        element: <NotFound />
    }
]

