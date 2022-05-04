import React from 'react';
import Dropzone from "./Dropzone";
import styles from "./Dropzone.module.css";

const CoverUpload = (props: any) => {
    return (
        <div>
            {props.cover.map((path: any) =>
                <>
                    <img className={styles.cover} key={path} src={path} />
                </>)}
            <Dropzone {...props}/>
        </div>
    );
};

export default CoverUpload;