import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import SelectType from "./SelectType";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

type Props ={
    typeOptions: string[];
    onSearch: (event: any)=>void;
    inputState:  [string, React.Dispatch<React.SetStateAction<string>>]
    typeState:  [string, React.Dispatch<React.SetStateAction<string>>]
}

const Header: React.FC<Props> =
    ({typeOptions,
        onSearch,
        inputState,
        typeState } ) => {

    let [input, setInput] = inputState;
    let [type, setType] = typeState;

    const onEnter = (event: any) =>{
        if (event.key === 'Enter' && input !== '') {
            onSearch(event);
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="inherit" position="static" sx={{paddingLeft: 30}}>
                <Toolbar>
                    <TextField
                        color={"secondary"}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onEnter}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{m: 0}} />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        sx={{mr: 4}}
                    />
                    <SelectType value={type}
                                onChange={(e) => setType(e.target.value)}
                                options={typeOptions}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;