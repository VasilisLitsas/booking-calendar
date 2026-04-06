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

const App: FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      title: 'Learn cool stuff',
      start,
      end,
    },
  ])

  const onEventResize: withDragAndDropProps['onEventResize'] = data => {
    const { start, end } = data

    setEvents(currentEvents => {
      const firstEvent = {
        start: new Date(start),
        end: new Date(end),
      }
      return [...currentEvents, firstEvent]
    })
  }

  const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
    console.log(data)
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
//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar)

export default App
