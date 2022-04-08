import React from 'react';
import Header from "../components/Header";
import { Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Link} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Button from "@mui/material/Button";

const url = 'http://localhost:8080/api/';


interface user {
    id: number,
    email: string
}

const Users = () => {

    const type = React.useState('user');
    const input = React.useState('');
    const [users, setUsers] = React.useState<user[]>();

    const userSearch =(e: any) => {
            fetch(url +'user/email/' + input[0] + '?offset=0' + '&limit=10' + '&usertype=' + type[0])
                .then((response) =>{
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((json) =>{
                    setUsers(json);
                })
                .catch((error) => {
                    console.log(error)
                });
    };

    let renderList = users?.map((user: user, index) => {
            return (
                <TableRow>
                    <TableCell sx={{width: 2}}>
                        {index}
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