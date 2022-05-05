import React from 'react';
import {FileWithPath} from "react-dropzone";
import styles from "./Dropzone.module.css";



const Dropzone = (props: any) => {
    const {acceptedFiles, getRootProps, getInputProps, text} = props

    const files = acceptedFiles.map((file: FileWithPath) => (
        <p key={file.path}>
            {file.path} <b>({ Math.ceil(file.size/1000000 * Math.pow(10, 2)) / Math.pow(10, 2)} mb)</b>
        </p>
    ));

    return (
        <div>
            <div className={styles.drop} {...getRootProps()}>
                <input {...getInputProps()} />
                <p>{text}</p>
            </div>
            <div className={styles.files}>
                {files}
            </div>
        </div>
    );
};

export default Dropzone;