import React from 'react';
import Header from "../components/Header";
import { Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Link} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Button from "@mui/material/Button";
import axios from "axios";

const url = 'http://localhost:8080/api/';


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

    const type = React.useState('user');
    const input = React.useState('');
    const [users, setUsers] = React.useState<user[]>();

    const userSearch =(e: any) => {
        axios.get(url +'user/email/'
            + input[0]
            + '?offset=0'
            + '&limit=10'
            + '&usertype=' + type[0], {
            headers: {
                'Authorization': `token ${getCookie('SAT')}`
            }
        })
        .then((res) =>{
            setUsers(res.data);
        })
        .catch((error) => {
            if (error.response.status === 403) {
                /*logout*/
            }
        });
    };

    let renderList = users?.map((user: user, index) => {
            return (
                <TableRow key={user.id}>
                    <TableCell sx={{width: 2}}>
                        {index+1}
                    </TableCell>
                    <TableCell sx={{width: 3}}>
                        {user.id}
                    </TableCell>
                    <TableCell>
                        {user.email}
                    </TableCell>
                    <TableCell sx={{width: 2}}>
                        <Link
                            to={`/User/${user.id}`}
                            style={{color: "grey", textDecoration: "none"}}
                        >
                            DETAILS
                        </Link>
                    </TableCell>
                    <TableCell sx={{width: 2}}>
                        <Button size={"small"} style={{color: "red", textDecoration: "none"}}>DELETE</Button>
                    </TableCell>
                </TableRow>
        )});

    return (
        <div>
            <Sidebar/>
            <Header
                typeOptions={['user', 'artist']}
                onSearch={userSearch}
                inputState={input}
                typeState={type}
            />

            <Table sx={{ minWidth: 550, maxWidth: "calc(50% - 250px)", marginLeft: "250px" }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell sx={{width: 2}}></TableCell>
                        <TableCell sx={{width: 2}}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderList}
                </TableBody>
            </Table>
        </div>
    );
};

export default Users;