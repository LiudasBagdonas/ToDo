import { useState, useEffect } from "react";
import Context from "./context";

function Provider({ children }) {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([])


    return (
        <Context.Provider value={{projects, setProjects, tasks, setTasks}}>
            {children}
        </Context.Provider>
    );
}

export default Provider;