import React, { useState } from 'react';

const JournalPage = () => {
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // это пример данных надо будет БД ЗАКАЧАТЬ а это убрать ЙОПТА
  const dataSource = [
    {
      key: '1',
      date: '2023-10-15',
      student: 'Иванов Иван',
      subject: 'Математика',
      status: 'Пропуск',
      reason: 'Болезнь',
    },
    {
      key: '2',
      date: '2023-10-16',
      student: 'Петрова Анна',
      subject: 'Физика',
      status: 'Опоздание',
      reason: 'Пробки',
    },
    {
      key: '3',
      date: '2023-10-17',
      student: 'Сидоров Алексей',
      subject: 'Информатика',
      status: 'Присутствовал',
      reason: '',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Пропуск': return 'text-red-500';
      case 'Опоздание': return 'text-yellow-500';
      case 'Присутствовал': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const filteredData = dataSource.filter(item => {
    const matchesSearch = item.student.toLowerCase().includes(searchText.toLowerCase());
    const matchesDate = (!startDate || !endDate) || 
      (item.date >= startDate && item.date <= endDate);
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Журнал посещений</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Добавить запись
        </button>
      </div>

      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:space-x-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Поиск по студентам"
            className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          <input
            type="date"
            className="border rounded-md px-3 py-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="flex items-center">до</span>
          <input
            type="date"
            className="border rounded-md px-3 py-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <select
          className="border rounded-md px-3 py-2 w-full md:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Все статусы</option>
          <option value="Пропуск">Пропуск</option>
          <option value="Опоздание">Опоздание</option>
          <option value="Присутствовал">Присутствовал</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Студент</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Предмет</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Причина</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.key} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.student}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.subject}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${getStatusColor(item.status)}`}>{item.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.reason || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button 
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => console.log('Edit', item)}
                  >
                    Редактировать
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => console.log('Delete', item)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* просто ебанутая пагинация голова заболела  */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Показано {filteredData.length} из {dataSource.length} записей
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-md">Назад</button>
          <button className="px-3 py-1 border rounded-md">Вперед</button>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;