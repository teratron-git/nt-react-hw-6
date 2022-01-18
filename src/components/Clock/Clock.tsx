import moment from "moment-timezone"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.min.css"
import { v4 as uuidv4 } from "uuid"
import st from "./Clock.module.css"
import ClockItem from "./ClockItem"

interface IResultItem {
  id: string
  name: string
  diff: number | string
}

const Clock = () => {
  const [selectedName, setSelectedName]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
  const [selectedDiff, setSelectedDiff]: [number | string, Dispatch<SetStateAction<number | string>>] = useState<number | string>(
    undefined
  )
  const [date, setDate] = useState<any>()
  const [resultAmout, setResultAmount] = useState<IResultItem[]>([])

  function createDate() {
    setDate(new Date())
  }

  useEffect(() => {
    const interval = setInterval(createDate, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [date])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResultAmount([...resultAmout, { id: uuidv4(), name: selectedName, diff: selectedDiff }])
    setSelectedName("")
    setSelectedDiff("")
  }

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(e.target.value)
  }

  const changeDiff = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDiff(e.target.value)
  }

  const deleteHandler = (id: string) => {
    setResultAmount(resultAmout.filter((item) => item.id !== id))
  }

  // const editHandler = (id: string, date: Date, distance: number) => {
  //   deleteHandler(id)
  //   // setSelectedName(new Date(date))
  //   setSelectedDiff(distance)
  // }

  return (
    <div className={st.container}>
      <div className={st.steps}>
        <form className={st.header} onSubmit={(e) => submitHandler(e)}>
          <div className="dateItem">
            <label htmlFor="name">Город</label>
            <input type="text" name="name" id="name" value={selectedName} onChange={changeName} required autoComplete="off" />
          </div>

          <div className="distanceItem">
            <label htmlFor="distance">Временная зона</label>
            <input
              className={st.tz}
              type="number"
              name="tz"
              id="tz"
              value={selectedDiff}
              onChange={changeDiff}
              required
              autoComplete="off"
              step={1}
              min={-15}
              max={15}
            />
          </div>

          <input type="submit" name="button" id="button" value="Добавить" />
        </form>

        <div className={st.result}>
          <ol>
            <li className={st.resultHeader}>
              <span>Город</span>
              <span>Время</span>
              <span>Действия</span>
            </li>

            {resultAmout.map((item, i) => (
              <ClockItem key={item.id} id={item.id} name={item.name} deleteHandler={deleteHandler} selectedDiff={item.diff} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Clock
