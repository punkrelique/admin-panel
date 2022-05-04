import React, {useCallback, useState} from 'react';
import {FormControl, InputLabel, MenuItem, TextField} from "@mui/material";
import styled from "@emotion/styled";
import Sidebar from "../../components/Sidebar/Sidebar";
import {useNavigate} from "react-router-dom";
import styles from "./CreatePlaylist.module.css";
import Select from '@mui/material/Select';

import {useDropzone} from "react-dropzone";
import axios from "axios";
import Dropzone from "../../components/Dropzone/Dropzone";
import {getToken, queryConfig, queryConfigMultipart} from "../../components/QueryConfig";
import RedirectButton from "../../components/CustomButtons/RedirectButton";
import SimpleButton from "../../components/CustomButtons/SimpleButton";
import {TailSpin} from "react-loading-icons";
import CoverUpload from "../../components/Dropzone/CoverUpload";

const StyledTextField = styled(TextField)`
      width: 500px;
      margin-left: 270px;
      margin-top: 20px;`


const CreatePlaylist = () => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [paths, setPaths] = useState([]);
    const [uploading, setUploading] = useState<boolean>(false);

    const navigate = useNavigate();
    const token = getToken();

    const onDrop = useCallback(acceptedFiles => {
        setPaths(acceptedFiles.map((file: any) => URL.createObjectURL(file)));
    }, [setPaths]);
    const dropData = useDropzone({
        minSize: 0,
        maxSize: 1048576,
        onDrop
    });



    const createPlaylist =  () => {
        setUploading(true);
        const form: any = new FormData();
        let config = queryConfig(token);
        form.append('id', 0);
        form.append('title', title!);
        form.append('user_id', id!);
        form.append('type', type!);
        if (dropData.acceptedFiles[0]) {
            form.append('cover', dropData.acceptedFiles![0])
            config = queryConfigMultipart(token);
        }
        axios.post("/content/playlist", form, config)
            .then(res => {
                setUploading(true);
                navigate(`/Playlist/${res.data[0].id}`)
            })
            .catch(er => {
                setUploading(false);
                console.log(er)
            });
    }

    return (
        <div>
            <Sidebar/>
            <RedirectButton page={'content'} text={"BACK"}/>
            <h1 className={styles.title}>New Playlist</h1>
            <div className={styles.form}>
                <FormControl>
                <CoverUpload {...dropData} filetype={"cover"} size={1} cover={paths}/>
                <StyledTextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    color={"secondary"}
                    label={'Title'}
                />
                <FormControl color={"secondary"} sx={{ml: 34, mt: 2}}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={(e)=>setType(e.target.value)}
                    >
                        <MenuItem value={'album'}>Album</MenuItem>
                        <MenuItem value={'single'}>Single</MenuItem>
                        <MenuItem value={'ep'}>EP</MenuItem>
                    </Select>
                </FormControl>
                <StyledTextField
                    onChange={(e) => setId(e.target.value)}
                    color={"secondary"}
                    label={'Artist Id'}
                    value={id}
                />
                    {
                        uploading?
                            <TailSpin
                                className={styles.spinner}
                                stroke="#678DA6"
                                strokeWidth="2px"/>
                            :
                            <SimpleButton onClick={createPlaylist} text={"CREATE"}/>
                    }
                </FormControl>
            </div>
        </div>
    );
};

export default CreatePlaylist;