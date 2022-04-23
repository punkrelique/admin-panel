import React from 'react';
import styles from "../User/User.module.css";
import {useNavigate} from "react-router-dom";

const BackButton: React.FC<{page: string}> = (props) => {
    const navigate = useNavigate();
    return (
        <div>
            <button
                onClick={() => navigate(`/${props.page}`, {replace:false})}
                className={styles.back}
            >BACK
            </button>
        </div>
    );
};

export default BackButton;