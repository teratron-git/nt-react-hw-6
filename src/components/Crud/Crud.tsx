import axios from "axios"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import st from "./Crud.module.css"

interface IProps {
  id: string
  name: string
  selectedDiff: number | string
  deleteHandler: (id: string) => void
}

const Crud = () => {
  const [input, setInput] = useState("")
  console.log("🚀 ~ file: CRUD.tsx ~ line 13 ~ Crud ~ input", input)
  const [result, setResult] = useState([])
  console.log("🚀 ~ file: CRUD.tsx ~ line 17 ~ Crud ~ result", result)

  useEffect(() => {
    // axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
    async function getdata() {
      try {
        const response = await axios.get("http://localhost:7779/notes")
        console.log(response)
        setResult([...response.data])
      } catch (error) {
        console.error(error)
      }
    }

    getdata()
  }, [input])

  const inputChangeHandler = (e: any) => {
    setInput(e.target.value)
  }

  const submitHandler = (e: any) => {
    e.preventDefault()

    async function postData() {
      const body = {
        id: uuidv4(),
        content: input,
      }
      try {
        const response = await axios.post("http://localhost:7779/notes", body)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    postData()
  }

  return (
    <div className={st.container}>
      <div className="result">
        {result.map((item) => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
      <form onSubmit={submitHandler}>
        <textarea name="input" id="input" cols={30} rows={10} value={input} onChange={inputChangeHandler} />
        <input type="submit" name="button" id="button" value="Добавить" />
      </form>
    </div>
  )
}

export default Crud
