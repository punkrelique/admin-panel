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

interface IPlaylistData {
    id: number,
    title: string,
    user_id: number,
    type: string,
    img_src: string
}

const Playlist = () => {
    const [playlist, setPlaylist] = useState<IPlaylistData>();
    const [fetching, setFetching] = useState<boolean>(true);
    const props = useParams();

    useEffect(() => {
        axios.get(`/content/playlist/1`, queryConfig)
            .then(res => {
                setFetching(false);
                setPlaylist(res.data[0]);
            })
            .catch(console.log)
    }, []);

    const StyledTextField = styled(TextField)`
      width: 500px;
      margin-left: 270px;
      margin-top: 20px;
    `

    return (
        <div>
            <Sidebar/>
            <BackButton page={'content'}/>
            <h1 className={styles.title}>Edit Playlist Info</h1>
            <div className={styles.form}>
                {
                    fetching ?
                        <TailSpin
                            className={styles.spinner}
                            stroke="#678DA6"
                            strokeWidth="3px"
                        /> :
                        <FormControl>
                            {
                                playlist &&
                                Object.keys(playlist!).map((key, index) =>
                                    <StyledTextField
                                        key={key}
                                        label={key.replaceAll('_', ' ')}
                                        defaultValue={playlist[key as keyof typeof playlist]}
                                    />)
                            }
                            <button className={styles.update}>
                                UPDATE
                            </button>
                        </FormControl>
                }
            </div>
            <hr/>
            <div className={styles.tracks}>
                <h1>Tracks</h1>
                // put your tracks here
            </div>
        </div>
    );
};

export default Playlist;