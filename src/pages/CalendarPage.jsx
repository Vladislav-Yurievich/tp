import { useState } from 'react';
import { FiDownload, FiBarChart2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CalendarPage = () => {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const timeSlots = [
    { time: '9:45 - 11:20', name: 'Методологический анализ', type: 'blue' },
    { time: '11:30 - 13:05', name: 'Английский язык', type: 'green' },
    { time: '13:45 - 15:20', name: 'Дискретная математика', type: 'purple' },
    { time: '15:30 - 17:05', name: 'Проектная деятельность', type: 'red' },
  ];

  const [currentWeek] = useState('15 - 22 июн, 2023 г.');

  const getEventClass = (type) => {
    const classes = {
      blue: 'schedule-event-blue',
      green: 'schedule-event-green',
      purple: 'schedule-event-purple',
      red: 'schedule-event-red',
    };
    return `schedule-event ${classes[type] || 'schedule-event-blue'}`;
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="calendar-header">
        <div className="flex items-center space-x-4">
          <div className="calendar-nav">
            <button className="calendar-nav-item">Сегодня</button>
            <button className="calendar-nav-item active">Неделя</button>
            <button className="calendar-nav-item">Месяц</button>
            <button className="calendar-nav-item">Год</button>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <button className="p-1 hover:bg-gray-100 rounded">
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm">{currentWeek}</span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <FiDownload className="w-5 h-5" />
            <span>Скачать</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <FiBarChart2 className="w-5 h-5" />
            <span>Курс</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="time-column"></th>
              {days.map(day => (
                <th key={day} className="day-column">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="time-column py-2">
                  {slot.time}
                </td>
                {days.map((day, dayIndex) => (
                  <td key={`${index}-${dayIndex}`} className="schedule-cell">
                    <div className={getEventClass(slot.type)}>
                      {slot.name}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarPage;
