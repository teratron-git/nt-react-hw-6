import moment from "moment-timezone"
import st from "../Clock.module.css"

interface IProps {
  id: string
  name: string
  selectedDiff: number | string
  deleteHandler: (id: string) => void
}

const ClockItem = (props: IProps) => {
  return (
    <div className={st.resultItem}>
      <li>
        <span>{props.name}</span>
        <span>
          {moment()
            .utcOffset(+props.selectedDiff)
            .format("HH:mm:ss")}
        </span>
        <span style={{ color: "grey" }}>
          {moment()
            .utcOffset(+props.selectedDiff)
            .format("Z")}
        </span>
        <span>
          <i className="far fa-window-close" onClick={() => props.deleteHandler(props.id)} />
        </span>
      </li>
    </div>
  )
}

export default ClockItem
