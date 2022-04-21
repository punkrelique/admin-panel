import React, {useState} from 'react';
import {Button, FormControl, TextField} from "@mui/material";
import styled from "@emotion/styled";
import Sidebar from "../../components/Sidebar";
import {useNavigate, useParams} from "react-router-dom";
import styles from "../Playlist/CreatePlaylist.module.css";

import {useDropzone, FileWithPath} from "react-dropzone";

const StyledTextField = styled(TextField)`
      width: 500px;
      margin-left: 270px;
      margin-top: 20px;`

const CreatePlaylist = () => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [fetching, setFetching] = useState<boolean>(true);
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

    return (
        <div>
            <Sidebar/>
            {/*<BackButton page={'content'}/>*/}
            <FormControl sx={{pt: 7}}>
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
                    inputProps={{
                        readOnly: fetching,
                        autoComplete: 'off'
                    }}
                />
                <StyledTextField
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    color={"secondary"}
                    label={'Type'}
                />
                <StyledTextField
                    onChange={(e) => setId(e.target.value)}
                    color={"secondary"}
                    label={'Artist Id'}
                    value={id}
                />
                <button
                    type="submit"
                    className={`${styles.info} ${styles.update}`}
                >
                    CREATE
                </button>
            </FormControl>
        </div>
    );
};

export default CreatePlaylist;