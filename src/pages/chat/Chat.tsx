import * as React from "react";
import {useParams} from "react-router-dom";
import * as RRd from "react-router-dom";
import {Button} from "@mui/material";

export default function Chat(props: any) {
    const params = useParams()
    const outletContext = RRd.useOutletContext() as any
    const onClickConnectToUser = () => {
        if (!params.userId) return
        if (outletContext.websocket) {
            outletContext.websocket.close()
        }
        const webSocket = new WebSocket("ws://192.168.1.105:8080/scwa/chat-user")
        webSocket.onopen = (ev: Event) => {
            alert("websocket opened")
            outletContext.setConnectedUser(params.userId)
            outletContext.setWebsocket(webSocket)
        }
        webSocket.onclose = (ev: CloseEvent) => {
            alert("websocket closed")
            outletContext.setWebsocket(null)
            outletContext.setConnectedUser(null)
        }
    }
    const onClickDisConnectToUser = () => {
        outletContext.websocket.close()
    }
    const styleReceive = {display: "flex", justifyContent: "left"}
    const styleSend = {display: "flex", justifyContent: "right"}
    const styleCenter = {display: "flex", justifyContent: "center"}
    return (
        <div>
            {!params.userId ? <div style={styleCenter}>welcome to chat :)</div> : ""}
            {!params.userId ? <div style={styleReceive}>welcome to chat :)</div> : ""}
            {!params.userId ? <div style={styleSend}>welcome to chat :)</div> : ""}
            <div style={styleCenter}>
                {params.userId && outletContext.connectedUser && params.userId !== outletContext.connectedUser ? "First Disconnect Last Chat" : ""}
                {params.userId && !outletContext.connectedUser ?
                    <Button variant="contained" onClick={onClickConnectToUser}>Connect</Button> : ""}
                {params.userId && params.userId === outletContext.connectedUser ?
                    <Button variant="contained" onClick={onClickDisConnectToUser}>DisConnect</Button> : ""}
            </div>
        </div>
    );
}