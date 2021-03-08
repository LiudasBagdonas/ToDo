import { useState, useEffect } from "react";
import Context from "./context";

function Provider({ children }) {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([])


    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("projects"))
        if(items !== null) {
            setProjects(items)
        }
    }, [])

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("tasks"))
        if(items !== null) {
            setTasks(items)
        }
    }, [])

    return (
        <Context.Provider value={{projects, setProjects, tasks, setTasks}}>
            {children}
        </Context.Provider>
    );
}

export default Provider;