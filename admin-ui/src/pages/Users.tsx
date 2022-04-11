import React, {useEffect} from 'react';
import Header from "../components/Header";
import {
    Paper,
    Table,
    TableBody,
    TableCell, tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {Link} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Button from "@mui/material/Button";
import axios from "axios";
import {KeyboardDoubleArrowDown} from "@mui/icons-material";
import { TailSpin } from 'react-loading-icons';
import {styled} from "@mui/material/styles";

const url = 'http://localhost:8080/api/';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function getCookie(cookieName: string) {
    let cookie: {[name:string]: string} = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

interface user {
    id: number,
    email: string
}

const Users = () => {
    let loadMore;
    const type = React.useState('user');
    const input = React.useState('');
    const [offset, setOffset] = React.useState<number>(0);
    const [users, setUsers] = React.useState<user[]>([]);
    const [fetching, setFetching] = React.useState(true);
    const [received, setReceived] = React.useState(true);

    useEffect(() => {
        setUsers([]);
        setOffset(0);
        setReceived(true)
    }, [input[0], type[0]]);

    const userSearch =() => {
        setFetching(true);
        setTimeout(()=>{
        axios.get(url +'user/email/'
            + input[0]
            + '?offset=' + offset
            + '&limit=15'
            + '&userType=' + type[0], {
            headers: {
                'Authorization': `token ${getCookie('SAT')}`
            }
        })
        .then((res) =>{
            setUsers([...users, ...res.data]);
            setOffset(offset + 15);
            setFetching(false);
            if(res.data.length == 0){
                setReceived(false)
            }
        })
        .catch((error) => {
            if (error.response.status === 403) {
                /*logout*/
            }
        });
        }, 500)
    };

    let renderList = users?.map((user: user, index) => {
            return (
                <StyledTableRow key={user.id}>
                    <StyledTableCell sx={{width: 2}}>
                        {index+1}
                    </StyledTableCell>
                    <StyledTableCell sx={{width: 3}}>
                        {user.id}
                    </StyledTableCell>
                    <StyledTableCell>
                        {user.email}
                    </StyledTableCell>
                    <StyledTableCell sx={{width: 2}}>
                        <Link
                            to={`/User/${user.id}`}
                            style={{color: "grey", textDecoration: "none"}}
                        >
                            DETAILS
                        </Link>
                    </StyledTableCell>
                </StyledTableRow>
        )});

    loadMore =
    (users.length > 0 && received)?
            <Button
                sx={{width: "100%", m: 0}}
                size={"small"}
                onClick={() => {
                    userSearch();
                }}>
                {
                    fetching?
                        <TailSpin className="spinner"
                                  stroke="#616161"
                                  strokeWidth="3px"
                                  width={20}
                                  style={{margin: 0}}
                        />:
                        <KeyboardDoubleArrowDown color={"secondary"}
                                                 sx={{m:1}}/>
                }
            </Button> : '';

    return (
        <div>
            <Sidebar/>
            <Header
                typeOptions={['user', 'artist']}
                onSearch={userSearch}
                inputState={input}
                typeState={type}
            />
            <div style={{height: "70px"}}/>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 550 }}>
                    <Table
                        sx={{ minWidth: 550, maxWidth: "calc(50% - 250px)", marginLeft: "250px" }}
                        size="small"
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow >
                                <TableCell>№</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell sx={{width: 2}}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { fetching?
                                <TailSpin className="spinner"
                                          stroke="#616161"
                                          strokeWidth="4px"
                                          width={30}
                                          style={{margin: 0}}
                            /> : renderList}
                            <TableRow>
                                <TableCell colSpan={4} >
                                    {loadMore}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default Users;