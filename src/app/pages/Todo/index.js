import './index.css';
import moment from 'moment';
import ContentContext from "../../contexts/ContentContext";
import { useContext, useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Todo() {

    const [taskModalVisibility, setTaskModalVisibility] = useState(false)
    const [error, setError] = useState('')
    const [timestamp, setTimestamp] = useState(+new Date);
    const statusOptions = ['Pending', 'Done', 'In Progress'];

    const { projects, setProjects, tasks, setTasks } = useContext(ContentContext.context);
console.log(tasks)
    const onSubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById('task-form-title').value
        const project = document.getElementById('task-form-project-select').value
        const description = document.getElementById('task-form-description').value
        const date = moment(timestamp).format("DD-MM-YYYY HH:mm:ss")

        setTasks([{ title: title, project: project, description: description, date: date, status: 'Pending' }, ...tasks])
        setTaskModalVisibility(false)
    }

    const onChange = (e, index, task) => {
        const tasksArray = tasks;
        const taskToUpdate = tasks[index];
        const newArray = [];

        tasksArray.forEach((item) => {
            if (item !== taskToUpdate) {
                newArray.push(item)
            } else {
                newArray.push({ title: task.title, project: task.project, description: task.description, date: task.date, status: e.target.value })
            }
        })
        setTasks(newArray)
        console.log(tasks)
    }
    const removeCard = (index) => {
        const tasksArray = tasks;
        const taskToRemove = tasks[index];
        const newArray = [];

        tasksArray.forEach((item) => {
            if (item !== taskToRemove) {
                newArray.push(item)
            } 
        })
        setTasks(newArray)
    }

    useEffect(() => {
        if(tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks) || null)
        }
    }, [tasks])

    const removeModal = () => {
        setTaskModalVisibility(false)
        setError('')
    }

    return (
        <main>
            {taskModalVisibility &&
                <>
                    <div className="task-form-modal" onClick={() => removeModal()}>

                    </div>
                    <div className="tasks-form-box">
                        <form className="task-form" onSubmit={(e) => onSubmit(e)}>
                            <label>
                                Task Title
                            <input id="task-form-title" placeholder="Task Title" />
                            </label>
                            <label>
                                Project
                                <select id="task-form-project-select">
                                    {projects.map((project, index) => <option key={index}>{project.charAt(0).toUpperCase() + project.slice(1)}</option>)}
                                </select>
                            </label>
                            <label>
                                Task Description
                        <textarea id="task-form-description" placeholder="Task Description" />
                            </label>
                            <label>
                                Deadline
                        <DatePicker className="datepicker"
                                    selected={timestamp}
                                    onChange={date => setTimestamp(date)}
                                    showTimeSelect
                                    dateFormat="Pp"
                                />
                            </label>
                            <button type="submit">Create Task</button>
                        </form>
                        {error !== '' && <p className="error">{error}</p>}
                    </div>
                </>
            }
            <div className="tasks-box">
                <p className="create-task-button" onClick={() => setTaskModalVisibility(true)}>+ Task</p>
                <hr></hr>
                <section className="tasks-section">
                    {tasks.map((task, index) =>
                        <div key={index} className={`task-card status-color--${
                            task.status == 'Pending' ? 'yellow': 
                            task.status == 'Done' ? 'blue' : 
                            task.status == 'In Progress' ? 'green' : ''
                        }`}>
                            {timestamp > (new Date(task.date)).getTime() ? <p className="overdue-background">!</p> : ''}
                            <p onClick={() => removeCard(index)} className="card-delete-button">x</p>
                            <h3>{task.title}</h3>
                            <h6>{task.project}</h6>
                            <p>{task.description}</p>
                            <span>{task.date}</span>
                            <select onChange={(e) => onChange(e, index, task)}>
                                <option key={task.status}>{task.status}</option>
                                {statusOptions.map((item) =>
                                    item != task.status ? <option key={item}>{item}</option> : '')}
                            </select>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

export default Todo;