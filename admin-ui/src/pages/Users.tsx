import React from 'react';
import '../App.css'
import Header from "../components/Header";
import {
    List,
    ListItem, ListItemButton, ListItemText, ListSubheader,
} from "@mui/material";
import {Link} from "react-router-dom";
import Sidebar from "../components/Sidebar";

const url = 'http://localhost:8080/api/';
let usersMock = [
    {
        id : 1,
        email: "denchik@gmail.ru"
    },
    {
        id : 2,
        email: "lolchik@gmail.ru"
    },
    {
        id : 3,
        email: "prikolchik@gmail.ru"
    },
    {
        id : 4,
        email: "menchik@gmail.ru"
    },
]


interface user {
    id: number,
    email: string
}

const Users = () => {

    const type = React.useState('user');
    const input = React.useState('');

    const userSearch =(e: any) => {
            fetch(url +'user/email/' + input[0])
                .then((response) =>{
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((json) =>{

                })
                .catch((error) => {
                    console.log(error)
                });
    };

    let renderList = usersMock?.map((user) => {
            return (
                <ListItem key={user.id} component="div" disablePadding>
                    <ListItem>
                        <ListItemText primary={user.email} />
                    </ListItem>
                    <ListItemButton>
                        <Link to={`/User/${user.id}`}>Details</Link>
                    </ListItemButton>
                </ListItem>
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

            <List
                sx={{paddingLeft: 30, maxWidth: 800}}
                subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                          <h1>Users</h1>
                      </ListSubheader>
            }>
                {renderList}
            </List>
        </div>
    );
};

export default Users;