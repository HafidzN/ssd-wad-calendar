import { useState } from 'react'
import Dialog from './Dialog'
import { MONTHS } from '../helpers/consts'
import { 
    range,
    getDaysInMonth,
    getSortedDays,
    areDatesTheSame,
    getDateObj,
    generateRandomSaturatedColor,
    generateRandomId
} from '../helpers/utils'
import './style.scss'

const Calendar = ({ startingDate, listEvents, addEvent, deleteEvent }) => {
  const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth())
  const [currentYear, setCurrentYear] = useState(startingDate.getFullYear())
  const DAYS_IN_A_MONTH = getDaysInMonth(currentMonth, currentYear)
  const [showDialog, setShowDialog] = useState(false)   
  const [portalData, setPortalData] = useState({})

  const onAddEvent = date => {
    addEvent(date, generateRandomSaturatedColor(), generateRandomId())
  }

  const handleOnClickEvent = (event) => {
    setShowDialog(true)
    setPortalData(event)
  }

  const handlePotalClose = () => setShowDialog(false);

  const onDeleteEvent = () => {
    deleteEvent(portalData.id)
    handlePotalClose()
  }

  return (
    <div className="calendar__wrapper">
        <div className="calendar__head">
            {MONTHS[currentMonth]} {currentYear}
        </div>
        <div className="calendar__seven-col-grid">
            { getSortedDays(currentMonth, currentYear).map(day => (
                <div className="calendar__head-day" key={day}>{ day }</div>
            ))}
        </div>
        <div className={`calendar__body--${DAYS_IN_A_MONTH === 28 ? '4': '5'}`}>
            { range(DAYS_IN_A_MONTH).map(day => (
                <span 
                    className={`calendar__day ${areDatesTheSame(new Date(), getDateObj(day, currentMonth, currentYear)) ? 'active' : ''}`} 
                    key={day}
                    onClick={() => onAddEvent(getDateObj(day, currentMonth, currentYear))}
                    >
                    <p>{ day }</p>
                    {
                        (listEvents).map((event) => (
                            areDatesTheSame(getDateObj(day, currentMonth, currentYear), event.date, event) &&
                            <span 
                                className="calendar__event"
                                key={event.id}
                                onClick={() => handleOnClickEvent(event)}
                                draggable
                                style={{ backgroundColor: `${event.color}`}}
                            >{event.title} <br /> {event.time} <br/> {event.email}</span>
                        ))
                    }
                </span>
            ))}
        </div>
        {showDialog && (
          <Dialog
            {...portalData}
            handleDelete={onDeleteEvent}
            handlePotalClose={handlePotalClose}
          />
        )}
    </div>
  )
}

export default Calendar