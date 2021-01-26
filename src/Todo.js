import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

function Todo({ item, setTodos, todos }) {

    // const [filtered, setFiltered] = useState([])
    const [newText, setnewText] = useState('')
    const [isDone, setisDone] = useState(false)
    // const [todos, setTodos] = useState([])



    const handleUpdate = (item, newtext) => {
        setnewText(newtext)
        todos.map(todo => ((todo.id === item.id) ? todo.text = newtext : (todo.text = todo.text)))

    }

    const handleDelete = (item) => {

        // e.preventDefault()
        setTodos(todos.filter(todo => item.id !== todo.id))
        console.log(`${item.text} deleted successfully `)
        console.log(todos)

    }


    //Mark as Done!
    const handleSetDone = (item, state) => {

        todos.map(todo => ((todo.id === item.id) ? todo.isDone = state : (todo.isDone = todo.isDone)))
        setisDone(state)

        //Sort todos according to their isDone Status
        todos.sort((a, b) => (
            a.isDone > b.isDone
        ))

    }

    return (

        <div className='todo'>


            <div className="todo__item" >
                <div className="todo__editText">
                    <input type="text" className={(item.isDone) ? "todo--StrikeText" : ""} value={item.text} onChange={(e) => handleUpdate(item, e.target.value)} />

                    <DeleteIcon onClick={() => handleDelete(item)} className="delete--icon" />
                    {item.isDone ? <DoneAllIcon onClick={() => handleSetDone(item, !isDone)} className="done--icon" /> : <DoneIcon className="done--icon" onClick={() => handleSetDone(item, !isDone)} />}

                </div>
            </div>






        </div>
    )
}

export default Todo