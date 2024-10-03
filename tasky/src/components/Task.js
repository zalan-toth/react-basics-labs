import React from 'react';

const Task = (props) => {

    return (
        <div className="card" style={{backgroundColor: props.done ? '#bfbfbf' : '#09343b'}}>

            <p className="title">{props.title}</p>
            <p>Due: {props.deadline}</p>
            <p className="description"
               style={{backgroundColor: props.done ? '#a3a3a3' : '#2f4f4f'}}>{props.description}</p>
            <p className="priority" style={{
                background: props.priority === "Emergency"
                    ? 'linear-gradient(90deg, rgba(255,136,0,1) 0%, rgba(255,0,0,1) 53%, rgba(214,0,255,1) 100%)'
                    : props.priority === "High"
                        ? 'rgba(78,9,9,1)'
                        : props.priority === "Medium"
                            ? 'rgba(11,9,78,1)'
                            : props.priority === "Low"
                                ? 'rgba(9,78,38,1)'
                                : '#2f4f4f'
            }}>
                {props.priority}
            </p>
            <button onClick={props.markDone} className='doneButton'>Done</button>
            <button className='deleteButton' onClick={props.deleteTask}>Delete</button>

        </div>
    )
}

export default Task;