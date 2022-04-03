import React from 'react';
import {MenuItem, Select} from "@mui/material";
import {FormControl} from "@mui/material";

export type Props ={
    searchSelect?: string;
    handleChange?: (event: any) => void;
    options: string[];
}

const TypeSelect: React.FC<Props> = ({searchSelect,handleChange, options} ) => {

    const setOptions = options.map((type) => {
        return(
            <MenuItem key={type} value={type}>{type}</MenuItem>
        )});

    return (
        <FormControl  variant="standard" sx={{ m: 0, minWidth: 120}}>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={searchSelect}
                onChange={handleChange}
                label="Role"
            >
                {setOptions}
            </Select>
        </FormControl>
    );
};

export default TypeSelect;