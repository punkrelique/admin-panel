import React from 'react';
import {MenuItem, Select, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {FormControl} from "@mui/material";

export type Props ={
    value?: string;
    onChange?: (event: any) => void;
    options: string[];
}

const SelectType: React.FC<Props> = ({value,onChange, options} ) => {

    const [alignment, setAlignment] = React.useState(value);

    const setOptions = options.map((type) => {
        return(
            <ToggleButton key={type} value={type} aria-label="left aligned">
                {type}
            </ToggleButton>
        )});

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        if (onChange) {
            onChange(event);
        }
        setAlignment(newAlignment);
    };

    return (

            <ToggleButtonGroup
                value={alignment}
                size={"small"}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
            >
                {setOptions}
            </ToggleButtonGroup>
    );
};

export default SelectType;