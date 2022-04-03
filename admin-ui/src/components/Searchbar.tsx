import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Button, SelectChangeEvent} from "@mui/material";
import TypeSelect from "./TypeSelect";
import Search from "./Search";




export default function Searchbar() {
    const [searchSelect, setsearchSelect] = React.useState('User');
    const [input, setInput] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setsearchSelect(event.target.value);
    };

    const onSearch = (e: any) =>{
        if (e.key === 'Enter' && input !== '') {
            console.log(input + searchSelect)
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="inherit" position="static" sx={{paddingLeft: 30}}>
                <Toolbar>
                    <Search input={input} onChange={(e) => setInput(e.target.value)} searchType={onSearch} />
                    <TypeSelect searchSelect={searchSelect} handleChange={handleChange} options={['User', 'Artist']}/>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        size="large"
                        variant="contained"
                        onClick={() => console.log('Add New')}
                        color="inherit"
                    >
                        Add New
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}