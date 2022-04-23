import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import queryConfig from "../QueryConfig";
import styled from "@emotion/styled";
import {FormControl, TextField} from "@mui/material";
import Sidebar from "../Sidebar";
import styles from "../Playlist/Playlist.module.css";
import {TailSpin} from "react-loading-icons";
import BackButton from "../BackButton/BackButton";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import {useDropzone, FileWithPath} from "react-dropzone";

const Playlist: React.FC = () => {
    const [fetching, setFetching] = useState<boolean>(true);
    const [updating, setUpdating] = useState<boolean>(false); // TODO: spinner)
    const [id, setId] = useState<string | null>();
    const [title, setTitle] = useState<string | null>();
    const [userId, setUserId] = useState<string | null>();
    const [type, setType] = useState<string | null>();
    const [headerTitle, setHeaderTitle] = useState<string | null | undefined>("Loading..");
    const props = useParams();

    useEffect(() => {
        axios.get(`/content/playlist/${props.id}`, queryConfig)
            .then(res => {
                console.log(res.data[0])
                setId(res.data[0]["id"]);
                setTitle(res.data[0]["title"]);
                setUserId(res.data[0]["user_id"]);
                setType(res.data[0]["type"]);
                setHeaderTitle(title!);
                setFetching(false);
            })
            .catch(console.log)
    }, []);

    const StyledTextField = styled(TextField)`
      width: 500px;
      margin-left: 270px;
      margin-top: 20px;
    `

    const handleUpdatePlaylist = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUpdating(true);
        axios.put("/content/playlist", {
            id: id!,
            title: title!,
            user_id: userId!,
            type: type!,
            img_src: acceptedFiles!
        }, queryConfig)
            .then(res => {
                setUpdating(false);
                setHeaderTitle(title!);
            })
            .catch(er => {
                setUpdating(false);
                console.log(er)
            });
    }

    if (!headerTitle)
        setHeaderTitle(title);

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
            <BackButton page={'content'}/>
            <h1 className={styles.title}>Playlist — "{headerTitle ?? title}" </h1>
            <div className={styles.form}>
                {
                    fetching ?
                        <TailSpin className={styles.spinner} stroke="#678DA6" strokeWidth="5px"/>
                        :
                        <form onSubmit={handleUpdatePlaylist}>
                        <FormControl>
                            <div className={styles.drop} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Click or drag to upload cover (1mb max)</p>
                            </div>
                            <div className={styles.files}>
                                {files}
                            </div>
                            <StyledTextField
                                onChange={(e) => setId(e.target.value)}
                                label="playlist id"
                                type="number"
                                inputProps={{
                                    readOnly: true,
                                }}
                                color="secondary"
                                defaultValue={id}
                            />
                            <StyledTextField
                                size='medium'
                                multiline={false}
                                inputProps={{
                                    readOnly: fetching,
                                    autoComplete: 'off'
                                }}
                                onBlur={(e) => setTitle(e.target.value)}
                                label="title"
                                defaultValue={title}
                                color="secondary"
                                required
                            />
                            <StyledTextField
                                onBlur={(e) => setUserId(e.target.value)}
                                label="artist id"
                                type="number"
                                defaultValue={userId}
                                inputProps={{
                                    readOnly: fetching,
                                    autoComplete: 'off'
                                }}
                                color="secondary"
                                required
                            />
                            <FormControl>
                            <InputLabel
                                color="secondary"
                                sx={{
                                    marginLeft: "272px",
                                    marginTop: "21px"
                                }}

                            >type</InputLabel>
                            <Select
                                value={type}
                                sx={{
                                    marginLeft: "270px",
                                    marginTop: "20px"
                                }}
                                label="type"
                                onChange={(e) => setType(e.target.value)}
                                color="secondary"
                                required
                            >
                                <MenuItem value={"album"}>Album</MenuItem>
                                <MenuItem value={"single"}>Single</MenuItem>
                                <MenuItem value={"ep"}>Ep</MenuItem>
                            </Select>
                            </FormControl>
                            {
                                updating ?
                                    <TailSpin
                                        className={styles.spinner}
                                        stroke="#678DA6"
                                        strokeWidth="4px"/>
                                    :
                                    <button
                                        type="submit"
                                        className={`${styles.info} ${styles.update}`}
                                    >
                                        UPDATE
                                    </button>

                            }
                        </FormControl>
                        </form>
                }
            </div>
            <hr/>
            <div className={styles.tracks}>
                <div className={styles.playlistSongsHeader}>
                    <h1>Playlist Songs</h1>
                    <button className={`${styles.info} ${styles.add}`}>ADD</button>
                </div>
            </div>
        </div>
    );
};

export default Playlist;