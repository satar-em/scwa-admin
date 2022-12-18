import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import * as RRD from "react-router-dom"
import NotFound from "./pages/not-found/NotFound";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/Home";
import UserStatus from "./pages/user-status/UserStatus";

const router = RRD.createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path:"",
                element:<Home />
            },
            {
                path:"user",
                element:<UserStatus />
            },
            {
                path:"chat/:code?/*",
                element:<Chat />
            },
            {
                path: "*",
                element: <NotFound code={0}/>
            }
        ]
    },
])
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RRD.RouterProvider router={router}/>
    </React.StrictMode>
);