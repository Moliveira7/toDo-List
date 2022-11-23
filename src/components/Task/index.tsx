import styles from "./task.module.css";
import trash from '../../assets/Trash.svg';
import hover from '../../assets/Hover=true.svg';
import { ITask } from "../../App";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useState } from "react";

interface Props {
    task: ITask;
    onDelete: (taskId: string) => void;
    onComplete: (taskId: string) => void;
}


export function Task({ task, onDelete, onComplete }: Props) { 
    const [img, setImg] = useState(trash); 

    // function before hover
    function onHover() {
        setImg(hover);
    }
    // function after hover
    function outHover() {
        setImg(trash);
    }

    return (
        <div className={styles.task}>
            <button 
                className={styles.checkContainer}
                onClick={() => onComplete(task.id)}
            >
                {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
            </button>
            
             {/* make as underline */}
            <p className={task.isCompleted ? styles.textCompleted: ""}>{task.title}</p>

            <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
                {/* using the events onMouseOver and onMouseOut to make hover */}
                <img src={img}  onMouseOver={onHover} onMouseOut={outHover} />

                    
            </button>
        </div>

    )
}