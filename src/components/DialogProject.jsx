import { useRef } from 'react'
import dialog_css from './DialogProject.module.css'

export default function Dialog({ ref,
    parameters: {
        title: title,
        onAccept: acceptFn
    }
}) {

    const formRef = useRef()
    const titleRef = useRef()
    const dateRef = useRef()
    const descriptionRef = useRef()

    function handleSubmit(event) {
        acceptFn(titleRef.current.value,
            dateRef.current.value,
            descriptionRef.current.value)

        hanldeClose(event)
    }

    function hanldeClose(event) {
        event.preventDefault()
        formRef.current.reset()
        ref.current.close()
    }

    return (
        <dialog className={dialog_css.dialog} ref={ref}>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className={dialog_css.dialogContent}>
                    <h1 className={dialog_css.headerDialog}>Add {title}</h1>
                    <div className={dialog_css.inputDialog}>
                        <input ref={titleRef} required></input>
                        <input ref={dateRef} type='date' required></input>
                        <textarea ref={descriptionRef} required></textarea>
                    </div>
                    <div className={dialog_css.footerDialog}>
                        <button className={dialog_css.button}>Ok</button>
                        <button className={dialog_css.button} onClick={hanldeClose}>Cancle</button>
                    </div>
                </div>
            </form>
        </dialog>
    )
}