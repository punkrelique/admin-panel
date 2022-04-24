import React, {useEffect} from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import {
    Paper,
    Table,
    TableBody,
    TableCell, tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import axios from "axios";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {TailSpin} from "react-loading-icons";
import {KeyboardDoubleArrowDown} from "@mui/icons-material";
import {styled} from "@mui/material/styles";

let url = 'http://localhost:8080/api/';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function getCookie(cookieName: string) {
    let cookie: {[name:string]: string} = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

interface content {
    id: number,
    title: string,
    type: string
}

const Content = () => {
    let loadMore;
    const type = React.useState('playlist');
    const input = React.useState('');
    const [offset, setOffset] = React.useState<number>(0);
    const [content, setContent] = React.useState<content[]>([]);
    const [fetching, setFetching] = React.useState(true);
    const [received, setReceived] = React.useState(true);

    useEffect(() => {
        setContent([]);
        setOffset(0);
        setReceived(true)
    }, [input[0], type[0]]);

    const contentSearch =() => {
        setFetching(true);
        let cUrl = (type[0] == 'song')?
            url + 'content/song/name/':
            url + 'content/playlist/title/';

        setTimeout(()=>{
            axios.get(cUrl
                + input[0]
                + '?offset=' + offset
                + '&limit=15', {
                headers: {
                    'Authorization': `token ${getCookie('SAT')}`
                }
            })
                .then((res) =>{
                    setContent([...content, ...res.data]);
                    setOffset(offset + 15);
                    setFetching(false);
                    if(res.data.length == 0){
                        setReceived(false)
                    }
                })
                .catch((error) => {
                    if (error.response.status === 403) {
                        /*logout*/
                    }
                });
        }, 500)
    };

    let renderList = content?.map((content: content, index) => {
        return (
            <StyledTableRow key={content.id}>
                <StyledTableCell sx={{width: 2}}>
                    {index+1}
                </StyledTableCell>
                <StyledTableCell sx={{width: 3}}>
                    {content.id}
                </StyledTableCell>
                <StyledTableCell>
                    {content.title}
                </StyledTableCell>
                <StyledTableCell sx={{width: 2}}>
                    <Link
                        to={`/${type[0].charAt(0).toUpperCase() + type[0].slice(1)}/${content.id}`}
                        style={{color: "grey", textDecoration: "none"}}
                    >
                        DETAILS
                    </Link>
                </StyledTableCell>
            </StyledTableRow>
        )});

    loadMore =
        (content.length > 0 && received)?
            <Button
                sx={{width: "100%", m: 0}}
                size={"small"}
                onClick={() => {
                    contentSearch();
                }}>
                {
                    fetching?
                        <TailSpin className="spinner"
                                  stroke="#616161"
                                  strokeWidth="3px"
                                  width={20}
                                  style={{margin: 0}}
                        />:
                        <KeyboardDoubleArrowDown color={"secondary"}
                                                 sx={{m:1}}/>
                }
            </Button> : '';


    return (
        <div>
            <Sidebar/>
            <Header
                typeOptions={['playlist', 'song']}
                onSearch={contentSearch}
                inputState={input}
                typeState={type}
                addButton={true}
            />
            <div style={{height: "70px"}}/>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 550 }}>
                    <Table
                        sx={{ minWidth: 550, maxWidth: "calc(50% - 250px)", marginLeft: "250px" }}
                        size="small"
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow >
                                <TableCell>№</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell sx={{width: 2}}/>
                                <TableCell sx={{width: 2}}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { renderList}
                            <TableRow>
                                <TableCell colSpan={4} >
                                    {loadMore}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default Content;