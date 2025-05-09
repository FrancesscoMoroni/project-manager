import project_css from './Project.module.css'

export default function Project({ project, onAddTask, onRemoveTask }) {
    return (
        <>
            <section className={project_css.card}>
                {project ? (
                    <>
                        <h1 className={project_css.title}>{project.name}</h1>

                        <div className={project_css.date}>{project.date}</div>
                        <div className={project_css.description}>{project.description}</div>
                    </>
                ) : <h1 className={project_css.title}>Add new project</h1>}

                {project &&
                    (<div className={project_css.tasks}>
                        <button className={project_css.addButton} onClick={() => onAddTask("Task")}>
                            + Add Task
                        </button>
                        <ul className={project_css.taskList}>

                            {project.task.map((element, idx) => {
                                return (<li key={idx}>
                                    <div className={project_css.taskContent}>{element}</div>
                                    <button className={project_css.taskAction} onClick={() => onRemoveTask(project.id, idx)}>X</button>
                                </li>)
                            })}
                        </ul>
                    </div>)
                }

            </section>
        </>
    )
}