import * as React from "react";
import {useParams} from "react-router-dom";
import * as RRd from "react-router-dom";
import {Button, IconButton, TextField} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import {WebSocketObject} from "../../App";
import {PhotoCamera} from "@mui/icons-material";

export default function Chat(props: any) {
    const params = useParams()
    const outletContext = RRd.useOutletContext() as any
    const onClickConnectToUser = () => {
        if (!params.userId) return
        if (outletContext.websocket) {
            outletContext.websocket.close()
        }
        const webSocket = new WebSocket("ws://localhost:8080/scwa/chat-user")
        webSocket.onopen = (ev: Event) => {
            outletContext.setConnectedUser(params.userId)
            outletContext.setWebsocket(webSocket)
            webSocket.send("{\"messageType\":\"JoinToServer\",\"userType\":\"admin\",\"from\":\"\",\"to\":\"\",\"content\":\"Mohammad Emami On Client\",\"authentication\":\"admin-Satar\"}")
            setTimeout(()=>{
                webSocket.send("{\"messageType\":\"ConnectToChatWithMe\",\"userType\":\"admin\",\"from\":\"\",\"to\":\"\",\"content\":\""+params.userId+"\",\"authentication\":\"admin-Satar\"}")
            },1000)
        }
        const localChatObject=[...outletContext.serverObjects]
        webSocket.onmessage =(ev: MessageEvent) => {
            localChatObject.push(JSON.parse(ev.data) as WebSocketObject)
            outletContext.setServerObjects(localChatObject)
        }
        webSocket.onclose = (ev: CloseEvent) => {
            outletContext.setServerObjects([])
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
                    <ChatItem onClickDisConnectToUser={onClickDisConnectToUser}/> : ""}
            </div>
        </div>
    );
}

function ChatItem(props: any) {
    const outletContext = RRd.useOutletContext() as any
    const params = useParams()
    const [state, setState] = React.useState({clientId: null,inputValue:""})
    React.useEffect(() => {
        const chatObject = outletContext.serverObjects as WebSocketObject[]
        chatObject.forEach(value => {
            if (value.messageType === "SetClientId") {
                state.clientId = value.to as any
                setState({...state})
            }
        })
    }, [outletContext.serverObjects])
    const onChangeInput=(ev:any)=>{
        state.inputValue=ev.target.value
        setState({...state})
    }
    const onClickSend = () => {
        const message=state.inputValue
        state.inputValue=""
        setState({...state})
        outletContext.websocket.send("{\"messageType\":\"ChatWithEach\",\"userType\":\"admin\",\"from\":\""+state.clientId+"\",\"to\":\""+params.userId+"\",\"content\":\""+message+"\",\"authentication\":\"admin-Satar\"}")
    }
    const styleReceive = {display: "flex", justifyContent: "left"}
    const styleSend = {display: "flex", justifyContent: "right"}
    const styleCenter = {display: "flex", justifyContent: "center"}
    return (
        <div style={{width: "100%"}}>
            {(outletContext.serverObjects as WebSocketObject[]).map((value, index) =>
                value.messageType === "ChatWithEach" ?
                    <div style={value.from===state.clientId?styleSend:styleReceive} key={index}>
                        <div  className="card p-1" >
                            {value.content}
                        </div>
                    </div>
                    :
                    ""
            )}
            
            <div style={{...styleCenter,margin:5}}>
                <TextField onChange={onChangeInput} value={state.inputValue} style={{width:"80%"}} placeholder="typing..." label="Chat" variant="outlined" />
                <div onClick={onClickSend}>
                    <IconButton style={{marginLeft:10}} color="primary" component="label">
                        <MuiIcons.Send/>
                    </IconButton>
                </div>
            </div>
            <div style={styleCenter}>
                <Button variant="contained" onClick={props.onClickDisConnectToUser}>DisConnect</Button>
            </div>
            {/*{(outletContext.serverObjects as WebSocketObject[]).map((value, index) =>
                    <div style={styleCenter} key={index}>
                        {JSON.stringify(value)}
                    </div>
            )}*/}
        </div>
    )
}