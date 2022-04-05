import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import SelectType from "./SelectType";
import Search from "./Search";

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

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="inherit" position="static" sx={{paddingLeft: 30}}>
                <Toolbar>
                    <Search value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onSearch={onSearch}
                    />
                    <SelectType value={type}
                                onChange={(e) => setType(e.target.value)}
                                options={typeOptions}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    {/*<Button
                        size="large"
                        variant="contained"
                        onClick={() => console.log('Add New')}
                        color="inherit"
                    >
                        Add New
                    </Button>*/}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;