import axios from "axios"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import st from "./Crud.module.css"

const Crud = () => {
  const [input, setInput] = useState("")
  const [result, setResult] = useState([])

  async function getdata() {
    try {
      const response = await axios.get("http://localhost:7777/notes")
      console.log("🚀 ~ file: CRUD.tsx ~ GETresponse", response)

      setResult([...response.data])
    } catch (error) {
      console.error(error)
    }
  }

  async function postData() {
    const body = {
      id: uuidv4(),
      content: input,
    }
    try {
      const response = await axios.post("http://localhost:7777/notes", body)
      console.log("🚀 ~ file: CRUD.tsx ~ POSTresponse", response)
      if (response) getdata()
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteData(id: string) {
    try {
      const response = await axios.delete(`http://localhost:7777/notes/${id}`)
      console.log("🚀 ~ file: CRUD.tsx ~ DELETEresponse", response)
      if (response) getdata()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getdata()
  }, [])

  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    postData()
    setInput("")
  }

  const deleteHandler = (id: string) => {
    deleteData(id)
  }

  return (
    <div className={st.container}>
      <div className={st.header}>
        NOTES
        <i className="fas fa-sync-alt" onClick={() => getdata()} />
      </div>
      <div className={st.result}>
        {result.map((item) => (
          <div className={st.item} key={item.id}>
            {item.content}
            <span className={st.itemСlose} onClick={() => deleteHandler(item.id)}>
              X
            </span>
          </div>
        ))}
      </div>
      <form className={st.form} onSubmit={submitHandler}>
        <textarea name="input" id="input" cols={30} rows={10} value={input} onChange={inputChangeHandler} />
        <input className={st.buttonCrud} type="submit" name="button" id="button" value="Добавить" disabled={!input} />
      </form>
    </div>
  )
}

export default Crud
