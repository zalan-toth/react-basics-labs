import React from 'react';

const Task = (props) => {

    return (
        <div className="card" style={{backgroundColor: props.done ? '#bfbfbf' : '#09343b'}}>

            <p className="title">{props.title}</p>
            <p>Due: {props.deadline}</p>
            <p className="description"
               style={{backgroundColor: props.done ? '#a3a3a3' : '#2f4f4f'}}>{props.description}</p>
            <button onClick={props.markDone} className='doneButton'>Done</button>
            <button className='deleteButton' onClick={props.deleteTask}>Delete</button>

        </div>
    )
}

export default Task;