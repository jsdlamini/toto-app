import { useEffect, useState } from 'react';
import './App.css';
import FlipMove from 'react-flip-move';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';


function App() {
  const [todos, setTodos] = useState([])
  const [item, setItem] = useState("")
  // const [filtered, setFiltered] = useState([])
  const [newText, setnewText] = useState('')
  const [isDone, setisDone] = useState(false)
  const [quote, setQuote] = useState([])


  const addTodo = (e) => {
    e.preventDefault()
    if (item) {
      setTodos([...todos, { text: item.toUpperCase(), id: Date.now(), isDone: false }])
      //Sort todos according to their isDone Status
      setItem("")
    }


  }

  const handleUpdate = (item, newtext) => {
    setnewText(newtext)
    todos.map(todo => ((todo.id === item.id) ? todo.text = newtext : (todo.text = todo.text)))

  }

  const handleDelete = (item) => {
    // e.preventDefault()
    setTodos(todos.filter(todo => item.id !== todo.id))
    console.log(`${item.text} deleted successfully `)


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

  //Get all todos from local storage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);

    }


    const getQuote = async () => (
      await fetch('https://type.fit/api/quotes').then(response => response.json())
        .then(data => {

          setQuote(data[Math.floor(Math.random() * (data.length) + 1)].text)
        })

        .catch(error => console.log(error))
    )
    getQuote()

  }, [])

  //Save todos to local storage
  useEffect(() => {

    todos.sort((a, b) => (
      a.isDone > b.isDone
    ))
    localStorage.setItem("todos", JSON.stringify(todos))

    console.log('Fired...saving setup')
  }, [todos, newText, isDone])



  return (
    <div className="app">
      <div className="app__quote">
        <smaller>{quote} </smaller>
      </div>

      <div className="add__addTodo">
        <form>
          <div className="add__addTodo__inputs">
            <input type="text" value={item} placeholder='Add Todo'
              onChange={(e) => setItem(e.target.value)} />

            <IconButton onClick={addTodo} type='submit' >
              <AddCircleOutlineIcon className='add--icon' />
            </IconButton>


          </div>
        </form>

      </div>

      <div className="app__displayTodo">

        <FlipMove>
          {todos.map(item => (
            // <Todo todos={todos} item={item} setTodos={setTodos}  key = { item.id }  />
            <div className="todo__item" key={item.id}>
              <div className="todo__editText">
                <input type="text" className={(item.isDone) ? "todo--StrikeText" : ""} value={item.text} onChange={(e) => handleUpdate(item, e.target.value)} />

                <DeleteIcon onClick={() => handleDelete(item)} className="delete--icon" />
                {item.isDone ? <DoneAllIcon onClick={() => handleSetDone(item, !isDone)} className="done--icon" /> : <DoneIcon className="done--icon" onClick={() => handleSetDone(item, !isDone)} />}

              </div>
            </div>
          )
          )
          }
        </FlipMove>

      </div>
    </div>
  );
}

export default App;