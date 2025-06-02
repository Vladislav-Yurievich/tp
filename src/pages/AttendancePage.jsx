import { useState } from 'react';
import { FiBarChart2, FiDownload } from 'react-icons/fi';

const AttendancePage = () => {
  const [attendanceData] = useState({
    total: 87,
    present: 78,
    absent: 9
  });

  const [recentAttendance] = useState([
    { date: '01.06.2023', subject: 'Методологический анализ', status: 'Присутствовал' },
    { date: '02.06.2023', subject: 'Английский язык', status: 'Присутствовал' },
    { date: '03.06.2023', subject: 'Дискретная математика', status: 'Отсутствовал' },
    { date: '04.06.2023', subject: 'Проектная деятельность', status: 'Присутствовал' },
    { date: '05.06.2023', subject: 'Методологический анализ', status: 'Присутствовал' },
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Посещаемость</h1>
      
      <div className="attendance-card">
        <div className="attendance-header">
          <h2 className="attendance-title">Статистика посещаемости</h2>
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
        
        <div className="attendance-stats">
          <div className="stat-card">
            <div className="stat-value text-blue-500">{attendanceData.total}</div>
            <div className="stat-label">Всего занятий</div>
          </div>
          <div className="stat-card">
            <div className="stat-value text-green-500">{attendanceData.present}</div>
            <div className="stat-label">Посещено</div>
          </div>
          <div className="stat-card">
            <div className="stat-value text-red-500">{attendanceData.absent}</div>
            <div className="stat-label">Пропущено</div>
          </div>
        </div>
        
        <div className="attendance-chart bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center mb-6">
          <span className="text-gray-500">График посещаемости</span>
        </div>
      </div>
      
      <div className="attendance-card">
        <h2 className="attendance-title mb-6">Последние посещения</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-600">Дата</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Предмет</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Статус</th>
              </tr>
            </thead>
            <tbody>
              {recentAttendance.map((item, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="py-3 px-4">{item.date}</td>
                  <td className="py-3 px-4">{item.subject}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Присутствовал' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
