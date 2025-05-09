import app_css from './App.module.css'
import SideBar from './components/Sidebar';
import Project from './components/Project';
import { useRef, useState } from 'react';
import DialogTask from './components/DialogTask';
import DialogProject from './components/DialogProject';
import { createPortal } from 'react-dom';

function App() {

  const [projects, setProjects] = useState([])
  const [dialogParameters, setDialogParameters] = useState({
    title: "",
    onAccept: undefined
  })

  const dialogProjectRef = useRef()
  const dialogTaskRef = useRef()

  function handleAddProject(name, date, description) {
    let newProjects = projects.map((element) => {
      return {
        ...element,
        task: [...element.task]
      }
    })

    let newId = 1

    while (newProjects.some(e => e.id === newId)) {
      newId++
    }

    newProjects.push({
      id: newId,
      focus: false,
      date: date,
      description: description,
      name: name,
      task: []
    })

    setProjects(newProjects)
  }

  function handleFocusProject(id) {
    let newProjects = projects.map((element) => {
      return {
        ...element,
        task: [...element.task]
      }
    })

    if (newProjects.find((element) => element.focus)) {
      
    }

    let previousFocus = newProjects.find((element) => element.focus)
    if (previousFocus) {
      previousFocus.focus = false
    }

    newProjects.find((element) => element.id === id).focus = true

    setProjects(newProjects)
  }

  function handleAddTask(name) {
    let newProjects = projects.map((element) => {
      return {
        ...element,
        task: [...element.task]
      }
    })

    newProjects.find((element) => element.focus === true).task.push(name)

    setProjects(newProjects)
  }

  function handleRemoveTask(idProject, idTask) {
    let newProjects = projects.map((element) => {
      return {
        ...element,
        task: [...element.task]
      }
    })

    newProjects.find((element) => element.id === idProject).task.splice(idTask, 1)

    setProjects(newProjects)
  }

  function handleRemoveProject() {
    let newProjects = projects.map((element) => {
      return {
        ...element,
        task: [...element.task]
      }
    })

    newProjects.splice(newProjects.findIndex((e) => e.focus === true), 1)

    setProjects(newProjects)
  }

  function openDialog(title) {
    let parameters

    switch (title) {
      case "Project": {
        parameters = {
          title: title,
          onAccept: handleAddProject
        }
        setDialogParameters(parameters)
        dialogProjectRef.current.showModal()
        break
      }
      case "Task": {
        parameters = {
          title: title,
          onAccept: handleAddTask
        }
        setDialogParameters(parameters)
        dialogTaskRef.current.showModal()
        break
      }
      default: {
        parameters = {
          title: `ERROR, undefined dialog ${title}`,
          onAccept: undefined
        }
      }
    }
  }

  return (
    <>
      {createPortal(
        <>
          <DialogTask ref={dialogTaskRef} parameters={dialogParameters}></DialogTask>
          <DialogProject ref={dialogProjectRef} parameters={dialogParameters}></DialogProject>
        </>,
        document.getElementById("modal-root")
      )}


      <header>
        <h1 className={app_css.title}>Project manager</h1>
      </header>
      <main>
        <SideBar projects={projects} onAdd={openDialog} onFocus={handleFocusProject} onDelete={handleRemoveProject} />
        <Project project={projects.find((element) => element.focus)} onAddTask={openDialog} onRemoveTask={handleRemoveTask} />
      </main>
    </>
  );
}

export default App;
