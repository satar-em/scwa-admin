import * as React from "react";
import * as Material from "@mui/material"
import {Link, Outlet, useLocation} from "react-router-dom";

export default function App(props: any) {
    const [state,setState]=React.useState({currentPage:0,websocket:null,connectedUser:null})
    let location = useLocation();

    React.useEffect(() => {
        let goForSetState=false
        if (location.pathname==="/"&&state.currentPage!==0){
            goForSetState=true
            state.currentPage=0
        }else if (location.pathname.startsWith("/user")&&state.currentPage!==1){
            goForSetState=true
            state.currentPage=1
        } else if (location.pathname.startsWith("/chat") && state.currentPage !== 2) {
            goForSetState = true
            state.currentPage = 2
        }
        if (goForSetState){
            setState({...state})
        }
    }, [location]);
    const handleClickLink=(index:number)=>{
        /*state.currentPage=index
        setState({...state})*/
    }
    const setWebsocket=(websocket:any)=>{
        state.websocket=websocket
        setState({...state})
    }
    const setConnectedUser=(id:any)=>{
        state.connectedUser=id
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
                <Outlet context={{handleClickLink,websocket:state.websocket,setWebsocket:setWebsocket,setConnectedUser,connectedUser:state.connectedUser}} />
            </div>
        </div>
    );
}
