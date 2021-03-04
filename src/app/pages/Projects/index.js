import './index.css';
import ContentContext from "../../contexts/ContentContext";
import { useContext, useState, useEffect } from 'react';

function Projects() {

    const [modalVisibility, setModalVisibility] = useState(false);
    const [error, setError] = useState('')

    const { projects, setProjects, tasks, setTasksinState } = useContext(ContentContext.context);

    const onSubmit = (e) => {
        e.preventDefault();

        const newProject = document.getElementById('project-form-input').value
        console.log(projects.includes(newProject))
        if (newProject !== '' && !projects.includes(newProject)) {
            setProjects([...projects, newProject])
            setModalVisibility(false)
            console.log(projects)
            setError('')
        } else if (newProject === '') {
            setError('Input can not be empty.')
        } else if (projects.includes(newProject)) {
            setError('Project already exists.')
        }
    }

    const removeModal = () => {
        setModalVisibility(false)
        setError('')
    }

    return (
        <main className="">
            {/* Create Project modal shows up when button clicked */}
            {modalVisibility &&
                <>
                    <div className="project-form-modal" onClick={() => removeModal()}>

                    </div>
                    <div className="project-form-box">
                        <form className="project-form" onSubmit={(e) => onSubmit(e)}>
                            <label>
                                <input id="project-form-input" placeholder="New Project Name" />
                            </label>
                            <button type="submit">Create</button>
                        </form>
                        {error !== '' && <p className="error">{error}</p>}
                    </div>
                </>
            }
            <div className="projects-box">
                <p className="create-project-button" onClick={() => setModalVisibility(true)}>Create New Project</p>
                <ul className="projects-list">
                    {projects.map((project, index) =>
                        <li key={index}>{project}</li>
                    )}
                </ul>
            </div>
        </main>
    );
}

export default Projects;