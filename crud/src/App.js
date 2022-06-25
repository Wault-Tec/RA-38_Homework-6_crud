import './App.css';
import NoteItem from './components/NoteItem';
import { useEffect, useState, useRef } from 'react';

const App = () => {
  const [text, setText] = useState('')
  const [data, setData] = useState([])

  const textRef = useRef();

  const requestURL = 'http://localhost:7777/notes';

  const deleteURL = (id) => {
    return `http://localhost:7777/notes/${id}`
  }

  const sendRequest = async (method, url, body = null) => {
    const response = await fetch(url, {
      method: method,
      body: body === null ? null : JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (method === 'GET') {
      return await response.json();
    }
  }

  const requestData = (text) => {
    return (
      {
        "id": 0,
        "content": text
      }
    )
}

  const getUpdate = async () => {
    const response = await sendRequest('GET', requestURL);
    return setData(response);
  }

  useEffect(()=>{
    getUpdate()
  },[]) // componentDidMount

  const handleDelete = (id) => {
  sendRequest('DELETE', deleteURL(id))
  .then(() => getUpdate())
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest('POST', requestURL,requestData(text))
    .then(() => getUpdate())
    textRef.current.value = ''
    setText('')
  }  

  return (
    <div className="appWrapper">
      <div className="header">
      <h1>Notes</h1>
      <button className=" Btn updateBtn" onClick={getUpdate}>🗘</button>
      </div>
      <ul className="appUl">
      {data.map((item) => (<NoteItem text={item.content} id={item.id} key={item.id} onDelete={handleDelete}/>))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="note">New Note</label>
        <div className="textareaWrapper">
          <textarea name="note" onChange={handleChange} ref={textRef}>
          </textarea>
          <button className="Btn formBtn" type="submit">►</button>
        </div>
      </form>
    </div>
  )
}

export default App;
