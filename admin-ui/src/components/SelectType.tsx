import React from 'react';
import {MenuItem, Select} from "@mui/material";
import {FormControl} from "@mui/material";

export type Props ={
    value?: string;
    onChange?: (event: any) => void;
    options: string[];
}

const SelectType: React.FC<Props> = ({value,onChange, options} ) => {

    const setOptions = options.map((type) => {
        return(
            <MenuItem key={type} value={type}>{type}</MenuItem>
        )});

    return (
        <FormControl  variant="standard" sx={{ m: 0, minWidth: 120}}>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={value}
                onChange={onChange}
                label="Role"
            >
                {setOptions}
            </Select>
        </FormControl>
    );
};

export default SelectType;