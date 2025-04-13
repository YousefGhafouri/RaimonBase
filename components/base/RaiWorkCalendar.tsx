import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment, { Moment } from 'moment-jalaali';
import 'react-big-calendar/lib/css/react-big-calendar.css';
interface CalnedatProps {
    events: {
        id: number | string;
        title: string;
        start: Date | Moment;
        end: Date | Moment;
    }[];
    onSelect?: (props: SlotInfo) => void;
}

moment.loadPersian({
    dialect: 'persian-modern',
});
const localizer = momentLocalizer(moment);

export default function ShWorkCalendar({ events, onSelect }: CalnedatProps) {
    const [eventsData, setEventsData] = useState(events);
    moment.locale('fa', {
        week: {
            dow: 1,
            doy: 1,
        },
    });
    console.log(moment.loadPersian);
    useEffect(() => {
        setEventsData(events);
    }, [events]);
    return (
        <Calendar
            rtl={true}
            views={['day', 'agenda', 'work_week', 'month']}
            selectable={!!onSelect}
            localizer={localizer}
            defaultDate={moment().toDate()}
            defaultView="month"
            messages={{
                next: 'بعدی',
                previous: 'قبلی',
                today: 'امروز',
                day: 'روز',
                agenda: 'برنامه ی کار',
                work_week: 'هفته کاری',
                month: 'ماه',
                yesterday: 'دیروز',
                tomorrow: 'فردا',
                week: 'هفته',
                allDay: 'همه ی روز',
                event: 'رویداد',
                time: 'زمان',
                date: 'تاریخ',
                noEventsInRange: 'رویدادی در بازه اننخابی نیست.',
            }}
            formats={{
                dateFormat: 'jDD',
                dayFormat: 'ddd jMM/jDD',
                weekdayFormat: 'ddd',

                timeGutterFormat: 'HH:mm',

                monthHeaderFormat: 'jMMMM jYYYY',
                dayHeaderFormat: 'ddd jYYYY/jMM/jDD',
                dayRangeHeaderFormat: ({ start, end }, culture, local) =>
                    local?.format(start, 'jMMMM jDD', culture) +
                    ' - ' +
                    local?.format(end, 'jMMMM jDD', culture),
                // agendaDateFormat: "ddd MMM dd",
                // agendaTimeFormat: "HH:mm"
            }}
            events={eventsData}
            style={{ height: '500px' }}
            onSelectEvent={(event) => alert(event.title)}
            onSelectSlot={onSelect}
        />
    );
}
