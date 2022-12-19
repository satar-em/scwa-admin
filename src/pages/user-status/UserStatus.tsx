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

export default function UserStatus(props: any) {
    const navigate = RRd.useNavigate()
    const outletContext=RRd.useOutletContext() as any
    const [state, setState] = React.useState({data: []})
    React.useEffect(() => {
        Axios.default({
            method: "GET",
            url: "http://192.168.1.107:8080/scwa/rest-api/user-status/all",
            headers: {Authentication: "admin-Satar"}
        }).then((response: any) => {
            //console.log(response.data)
            state.data = response.data
            setState({...state})
        }).catch((reason: any) => {

        })
    }, [])
    const changeSelection = (selectionModel: GridSelectionModel, details: GridCallbackDetails) => {
    }
    const onClickGoToChat = (id:any) => {
        outletContext.handleClickLink(2)
        navigate("/chat/"+id)
    }
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 100, align: "left",headerAlign:"left"},
        {field: 'name', headerName: 'Name', width: 130},
        {field: 'type', headerName: 'Type', width: 130},
        {field: 'statusType', headerName: 'Status Type', width: 150,},
        {
            field: 'demoAction',
            headerName: 'Demo Render',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            renderCell: (params: GridRenderCellParams) => <Button variant="contained" size={"small"} onClick={()=>onClickGoToChat(params.row.id)}>Chat</Button>,
        },
        /*{field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.', sortable: false, width: 160, valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,},*/
    ];
    return (
        <div style={{height: 600, width: '100%'}}>
            <DataGrid
                rows={state.data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableColumnFilter
                /*checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={changeSelection}*/
            />
        </div>
    );
}
