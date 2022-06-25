const NoteItem = (props) => {
  const onDelete = () => {
    return props.onDelete(props.id)
  }

  return (
    <li className="card">
      <div className="cardText">
        {props.text}
      </div>
      <button className="Btn CardBtn" onClick={onDelete}>╳</button>
    </li>
  )
}

export default NoteItem