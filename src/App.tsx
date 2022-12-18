import * as React from "react";
import * as Material from "@mui/material"
import {Link, Outlet, useParams} from "react-router-dom";

export default function App(props: any) {
    let index=0
    if (document.location.pathname.startsWith("/user")) index=1
    if (document.location.pathname.startsWith("/chat")) index=2
    const [state,setState]=React.useState({currentPage:index})
    const handleClickLink=(index:number)=>{
        state.currentPage=index
        setState({...state})
    }
    return (
        <div>
            <ul className="nav nav-tabs justify-content-center bg-light">
                <li className="nav-item">
                    <Link to={"/"} className={state.currentPage==0?"nav-link active":"nav-link"} onClick={()=>{handleClickLink(0)}}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/user"} className={state.currentPage==1?"nav-link active":"nav-link"} onClick={()=>{handleClickLink(1)}}>User Status</Link>
                </li>
                <li className="nav-item">
                    <Link to={"chat"} className={state.currentPage==2?"nav-link active":"nav-link"} onClick={()=>{handleClickLink(2)}}>Chat</Link>
                </li>
            </ul>
            <div className="container-lg">
                <Outlet/>
            </div>
        </div>
    );
}
