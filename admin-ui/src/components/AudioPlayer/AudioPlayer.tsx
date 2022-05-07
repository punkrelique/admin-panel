import React, {useEffect, useState} from 'react';

const AudioPlayer: React.FC<{filename: string}> = (props) => {
    const [audio] = useState<HTMLAudioElement>(new Audio(
        '../' + props.filename
    ));

    // '../../../admin-api/assets/uploads/songs/'

    const [playing, setPlaying] = useState<boolean>(false)

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return (
        <button type="button" onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    );
};

export default AudioPlayer;