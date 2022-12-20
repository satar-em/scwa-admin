import * as React from "react";
import * as Axios from "axios";
import * as RRd from "react-router-dom";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {
    DataGrid,
    GridCallbackDetails,
    GridColDef,
    GridRenderCellParams,
    GridSelectionModel,
    GridValueGetterParams
} from "@mui/x-data-grid";
import {useNavigation} from "react-router-dom";
import {useContext} from "react";

export default function UserStatus(props: any) {
    const navigate = RRd.useNavigate()
    const outletContext = RRd.useOutletContext() as any
    const [state, setState] = React.useState({data: []})
    React.useEffect(() => {
        Axios.default({
            method: "GET",
            url: "http://192.168.1.107:8080/scwa/rest-api/user-status/all",
            headers: {Authentication: "admin-Satar"}
        }).then((response: any) => {
            state.data = response.data
            setState({...state})
        }).catch((reason: any) => {

        })
    }, [])
    const changeSelection = (selectionModel: GridSelectionModel, details: GridCallbackDetails) => {
    }
    const onClickGoToChat = (id: any) => {
        outletContext.handleClickLink(2)
        navigate("/chat/" + id)
    }
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', align: "left", minWidth: 80, headerAlign: "left", flex: 1},
        {field: 'name', headerName: 'Name', minWidth: 150, flex: 1},
        {field: 'type', headerName: 'Type', minWidth: 100, flex: 1},
        {field: 'statusType', headerName: 'Status Type', minWidth: 100, flex: 1},
        {
            field: 'demoAction',
            headerName: 'Demo Render',
            description: 'This column has a value getter and is not sortable.',
            sortable: false, minWidth: 100, flex: 1,
            renderCell: (params: GridRenderCellParams) => params.row.statusType==="Waiting"?<Button variant="contained" size={"small"}
                                                                  onClick={() => onClickGoToChat(params.row.id)}>Chat</Button>:"",
        },
        {
            field: 'connect',
            headerName: 'Connect Status',
            description: 'This column has a value getter and is not sortable.',
            sortable: false, minWidth: 150, flex: 1,
            renderCell: (params: GridRenderCellParams) =>
                <div>{params.row.id === outletContext.connectedUser ? "Connected with you" : ""}</div>,
        },
        /*{field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.', sortable: false, width: 160, valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,},*/
    ];
    return (
        <div>
            <DataGrid
                autoHeight
                rows={state.data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableColumnFilter
                disableSelectionOnClick
                disableColumnMenu
                /*checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={changeSelection}*/
            />
        </div>
    );
}
