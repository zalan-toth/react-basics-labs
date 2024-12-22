import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './components/Task';
import AddTaskForm from './components/Form';
import { v4 as uuidv4 } from 'uuid';
import {getTasks, addTask, deleteTask, updateTask} from "./api/tasky-api";


function App() {
    /*const [ taskState, setTaskState ] = useState({
        tasks: [
            { id: 1, title:"Dishes", description: "Empty dishwasher", deadline: "Today", priority: "Low", done: false },
            { id: 2, title: "Laundry", description: "Fold clothes and put away", deadline: "Tomorrow", priority: "Medium", done: false },
            { id: 3, title: "Tidy up", deadline: "Today", priority: "High", done: false},
            { id: 4, title: "Deploy the army", description: "Unite the 7 kingdoms and protect the realm", deadline: "The day before tomorrow", priority: "Emergency", done: false},
            { id: 3, title: "Fly home",description: "Ryanair awaits", deadline: "2024", priority: "Medium", done: false},
        ]
    });*/
    const [ taskState, setTaskState ] = useState({tasks: []});

    useEffect(() => {
        getTasks().then(tasks => {
            setTaskState({tasks: tasks});
        });
    }, []);
    const doneHandler = (taskIndex) => {
        const tasks = [...taskState.tasks];
        tasks[taskIndex].done = !tasks[taskIndex].done;
        updateTask(tasks[taskIndex]);
        setTaskState({tasks});
    }

    const deleteHandler = (taskIndex) => {
        const tasks = [...taskState.tasks];
        const id=tasks[taskIndex]._id;
        tasks.splice(taskIndex, 1);
        deleteTask(id);
        setTaskState({tasks});
    }


    const [ formState, setFormState ] = useState({
        title: "",
        description: "",
        deadline: "",
        priority: "Low"
    });
    const formChangeHandler = (event) => {
        let form = {...formState};
        form.priority = "Low";

        switch(event.target.name) {
            case "title":
                form.title = event.target.value;
                break;
            case "description":
                form.description = event.target.value;
                break;
            case "deadline":
                form.deadline = event.target.value;
                break;
            case "priority":
                form.priority = event.target.value;
                break;
            default:
                form = formState;
        }
        setFormState(form);
    }
    console.log(formState);
    const formSubmitHandler = async (event) => {
        event.preventDefault();
        const tasks = taskState.tasks?[...taskState.tasks]:[];
        const form = {...formState};
        const newTask = await addTask(form);
        tasks.push(newTask);
        setTaskState({tasks});
    }

    return (
        <div className="container">
            <h1>Tasky</h1>
            {taskState.tasks.map((task, index) => (
                <Task
                    title={task.title}
                    description={task.description}
                    deadline={task.deadline}
                    key={task._id}
                    done={task.done}
                    priority={task.priority}
                    markDone={() => doneHandler(index)}
                    deleteTask={() => deleteHandler(index)}
                />
            ))}
            <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} />
        </div>
    );
}

export default App;
