import addHours from 'date-fns/addHours'
import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import parse from 'date-fns/parse'
import startOfHour from 'date-fns/startOfHour'
import startOfWeek from 'date-fns/startOfWeek'
import { FC, useState } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'

import elGR from 'date-fns/esm/locale/el/index.js'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

interface IEvent extends Event {
  id: number
  gymnast: string
  maxParticipants: number
}

// Set min/max times
const minTime = new Date()
minTime.setHours(10, 0, 0, 0) // 10:00 AM

const maxTime = new Date()
maxTime.setHours(23, 0, 0, 0) // 11:00 PM

const CalendarView: FC = () => {
  const [events, setEvents] = useState<IEvent[]>([
    {
      id: 1,
      title: 'Yoga',
      gymnast: 'Vicky',
      maxParticipants: 10,
      start,
      end,
    },
  ])

  const onEventResize: withDragAndDropProps['onEventResize'] = data => {
    const event = data.event as IEvent;
    const start = data.start instanceof Date ? data.start : new Date(data.start);
    const end = data.end instanceof Date ? data.end : new Date(data.end);

    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id
          ? { ...e, start, end } // 👈 update only resized event
          : e
      )
    )
  }

  const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
    const event = data.event as IEvent;
    const start = data.start instanceof Date ? data.start : new Date(data.start);
    const end = data.end instanceof Date ? data.end : new Date(data.end);

    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id
          ? { ...e, start, end } // 👈 update only resized event
          : e
      )
    )
  }

  const DAYS_TO_SHOW = [1, 2, 3, 4, 5] // 0=Sunday, 6=Saturday

  return (
    <DnDCalendar
      defaultView='week'
      views={['week']}
      events={events}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: '100vh' }}
      toolbar={false}
      formats={{
        dayFormat: (date, culture, localizer) => localizer!.format(date, 'EEEE', 'el-GR'),
      }}
      dayPropGetter={date => {
        // hide weekends by returning display:none for days you don't want
        if (!DAYS_TO_SHOW.includes(date.getDay())) {
          return { style: { display: 'none' } }
        }
        return {}
      }}
      min={minTime}
      max={maxTime}
      components={{
        event: CustomEvent, // 👈 our custom event layout
      }}
    />
  )
}

const locales = {
  'el-GR': elGR,
}
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1)
const now = new Date()
const start = endOfHour(now)
const end = addHours(start, 2)

// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }), // 👈 Monday
  getDay,
  locales,
})

// Custom Event component
const CustomEvent = ({ event }: any) => {
  return (
    <div style={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontWeight: 'bold', fontSize: 16 }}>{event.title}</div>
      <div style={{ fontSize: 14 }}>{event.gymnast}</div>
      <div style={{ fontSize: 16, color: '#fff' }}>
        Max: {event.maxParticipants}
      </div>
    </div>
  )
}

//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar)




export default CalendarView
