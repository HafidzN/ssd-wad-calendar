import { useState, useEffect } from 'react'
import './App.scss'
import { EVENTS } from './helpers/consts'
import Calendar from './components/Calendar'
import { saveArrayToLocalStorage } from './helpers/utils'
function App() {
  const [events, setEvents] = useState([])
  
  useEffect(() => {
    let updatedEvents = EVENTS
    const storedArray = localStorage.getItem('events')
    if (storedArray) {
      const parsedArray = JSON.parse(storedArray)
      updatedEvents = parsedArray.map((event) => ({
        ...event,
        date: new Date(event.date)
      }))
    }
    setEvents(updatedEvents)
  }, [])

  const addEvent = (date, color, id) => {
    console.log({ date, events })
    const hasThreeEvent = events.filter(event => event.date.toISOString().slice(0, 10) === date.toISOString().slice(0, 10)).length === 3

    if (hasThreeEvent) {
      alert('Already 3 events on the same day')
    } else {
      const title = window.prompt('Enter the title of the event')
      let time, email
      let isTimeValid = false, isEmailValid = false
  
      if (title){
        const timeInput = prompt('Enter the time in 12-hour format (hh:mm AM/PM):')
        const timeRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9]) ([AaPp][Mm])$/
        const isValidTime = timeRegex.test(timeInput)
        if (isValidTime) {
          time = timeInput
          isTimeValid = true
          const emailInput = prompt('Enter your email address:');
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isValidEmail = emailRegex.test(emailInput);
          
          if (isValidEmail) {
            isEmailValid = true
            email = emailInput
          } else {
            alert('Invalid email address. Please try again.');
          }
        } else {
          alert('Invalid time format. Please try again.')
        }
      } else {
        alert('Invalid event title. Please try again.')
      }
  
      if (title && isTimeValid && isEmailValid) {
        const updatedEvents = [
          ...events,
          {
            date,
            title,
            color,
            id,
            time,
            email
          }
        ]
        setEvents(updatedEvents)
        saveArrayToLocalStorage('events', updatedEvents)
      }
    }
  }

  const deleteEvent = (id) => {
    console.log({ id })
    const updatedEvents = [...events].filter((ev) => ev.id !== id)
    setEvents(updatedEvents)
    saveArrayToLocalStorage('events', updatedEvents)
  }

  return (
    <Calendar
      startingDate={ new Date() }
      listEvents={ events }
      addEvent={ addEvent }
      deleteEvent={ deleteEvent }
    />
  )
}

export default App
