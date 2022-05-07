import React, {SetStateAction, useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {FormControl, TextField} from "@mui/material";
import axios from "axios";
import {getToken, queryConfig, queryConfigMultipart} from "../QueryConfig";
import {useDropzone} from "react-dropzone";
import {TailSpin} from "react-loading-icons";
import Dropzone from "../Dropzone/Dropzone";
import RedirectButton from "../CustomButtons/RedirectButton";
import styles from './Song.module.css'
import {Form} from "react-bootstrap";

const Song: React.FC<{id: string, playlistId: string}> = (props) => {
    const [fetching, setFetching] = useState<boolean>(true);
    const [updating, setUpdating] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [headerSong, setHeaderSong] = useState<string | null | undefined>();
    const [error, setError] = useState<string>("");
    const dropData = useDropzone({
        minSize: 0,
        maxSize: 1048576*5
    });
    const StyledTextField = styled(TextField)`
      width: 500px;
      margin-left: 270px;
      margin-top: 20px;
    `
    const token = getToken();

    useEffect(() => {
        axios.get('/uploads/songs/john.mp3', queryConfig(token))
            .then(console.log)
            .catch(console.log)

        axios.get(`/content/song/${props.id}`, queryConfig(token))
            .then(res => {
                setFetching(false);
                setName(res.data[0]['name'])
                setId(res.data[0]['id'])
            })
            .catch(console.log)
    }, []);

    const handleUpdateSong = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setUpdating(true);
        let config = queryConfig(token);
        const form: any = new FormData();
        form.append('name', name);
        form.append('id', id);

        if (dropData.acceptedFiles[0]) {
            let nameFile = dropData.acceptedFiles[0].name.split('.');
            if (nameFile[nameFile.length-1]!=="mp3"){
                setUpdating(false);
                setError("It is not mp3 extension");
                return;
            }
            form.append('song', dropData.acceptedFiles![0])
            config = queryConfigMultipart(token);
        };

        axios.put('/content/song', form, config)
            .then(res => {
                setUpdating(false);
                setHeaderSong(name);
            })
            .catch(er => {
                setUpdating(false);
                console.log(er)
            });
    }

    return (
        <div>
            <div>
                <RedirectButton page={`playlist/${props.playlistId}`} text={"BACK"}/> {/*TODO: back kuda?*/}
            </div>
            <h1 className={styles.titleSong}>Song — "{headerSong ?? name}" </h1>
            <div className={styles.formUpdate}>
            {
                fetching ?
                    <TailSpin className={styles.spinner} stroke="#678DA6" strokeWidth="5px"/>
                    :
                    <Form onSubmit={handleUpdateSong}>
                        <FormControl>
                            <Dropzone text={"Click or drag the file to upload song (5mb max)"} {...dropData}/>

                            <StyledTextField
                                label="id"
                                type="number"
                                inputProps={{
                                    readOnly: true,
                                }}
                                color="secondary"
                                defaultValue={id}
                            />
                            <StyledTextField
                                onBlur={(e) => setName(e.target.value)}
                                label="name"
                                type="text"
                                inputProps={{
                                    readOnly: updating,
                                    autoComplete: 'off'
                                }}
                                color="secondary"
                                defaultValue={name}
                            />
                            {
                                updating ?
                                    <TailSpin
                                        className={styles.spinner}
                                        stroke="#678DA6"
                                        strokeWidth="4px"/>
                                    :
                                    <button
                                        className={`${styles.info} ${styles.update}`}
                                    >
                                        UPDATE
                                    </button>
                            }
                            <b style={{color:'red', marginLeft: '270px'}}>{error}</b>
                        </FormControl>
                    </Form>
            }
            </div>
        </div>
    );
};

export default Song;