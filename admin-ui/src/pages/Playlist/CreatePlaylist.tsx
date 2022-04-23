import React, {useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, TextField} from "@mui/material";
import styled from "@emotion/styled";
import Sidebar from "../../components/Sidebar";
import {useNavigate, useParams} from "react-router-dom";
import styles from "../Playlist/CreatePlaylist.module.css";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {useDropzone, FileWithPath} from "react-dropzone";
import axios from "axios";

const StyledTextField = styled(TextField)`
      width: 500px;
      margin-left: 270px;
      margin-top: 20px;`

function getCookie(cookieName: string) {
    let cookie: {[name:string]: string} = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

const CreatePlaylist = () => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [uploading, setUploading] = useState<boolean>(true);
    const navigate = useNavigate();
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        minSize: 0,
        maxSize: 1048576
    });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <p key={file.path}>
            {file.path} - {file.size/1000000} mb
        </p>
    ));

    const createPlaylist =  () => {
        setUploading(true);
        axios.post("http://localhost:8080/api/content/playlist", {
            id: 0,
            title: title,
            user_id: id,
            type: type,
            img_src: `${acceptedFiles.map((file: FileWithPath) => file.path)}`
        }, {
            headers: {
                'Authorization': `token ${getCookie('SAT')}`
            }})
            .then(res => {
                setUploading(false);
            })
            .catch(er => {
                setUploading(false);
                console.log(er)
            });
    }


    return (
        <div>
            <Sidebar/>
            {/*<BackButton page={'content'}/>*/}
            <button
                onClick={() => navigate(`/content`, {replace:false})}
                className={styles.back}
            >BACK
            </button>
            <FormControl sx={{pt: 8}}>
                <div className={styles.drop} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Click or drag to upload cover (1mb max)</p>
                </div>
                <div className={styles.files}>
                    {files}
                </div>
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
                <button
                    type="submit"
                    onClick={createPlaylist}
                    className={`${styles.info} ${styles.update}`}
                >
                    CREATE
                </button>
            </FormControl>
        </div>
    );
};

export default CreatePlaylist;