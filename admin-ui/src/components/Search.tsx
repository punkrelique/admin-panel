import React from 'react';
import SearchIcon from "@mui/icons-material/Search";
import {alpha, createTheme, styled} from "@mui/material/styles";
import {grey} from "@mui/material/colors";

const mytheme = createTheme({
    palette: {
        primary: {
            main: grey[500],
        },
        secondary: {
            main: '#f44336',
        },
    },
});

const StyledSearch = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(mytheme.palette.primary.main, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled('input')(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {

        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,

        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

type Props ={
    input: string;
    onChange: (event: any) => void;
    searchType: (event: any) => void;
}

const Search:React.FC<Props> = ({input, onChange, searchType}) => {
    return (
        <StyledSearch>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                onKeyDown={searchType }
                value={input}
                onChange={onChange}
            />
        </StyledSearch>
    );
};

export default Search;