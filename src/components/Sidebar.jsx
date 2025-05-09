import sidebar_css from './Sidebar.module.css'

export default function SideBar({ projects, onAdd, onFocus, onDelete }) {

    return (
        <>
            <section className={sidebar_css.card}>
                <h1 className={sidebar_css.title}>SideBar</h1>
                <button className={sidebar_css.addButton} onClick={() => onAdd("Project")}>+ Add Project</button>
                <ul className={sidebar_css.projectList}>
                    {projects.map((element) => {
                        return (<li key={element.id}>
                            <button className={element.focus ? sidebar_css.focused : undefined}
                                onClick={() => { onFocus(element.id) }}>
                                {element.name}
                            </button>
                            {element.focus && <button className={sidebar_css.deleteButton} onClick={onDelete}>X</button>}
                        </li>)
                    })}
                </ul>
            </section>
        </>
    )
}